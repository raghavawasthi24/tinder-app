import React, { useState, useRef, MouseEvent, TouchEvent } from "react";
import "./App.css";
import { data } from "./constants/data";
import { Card } from "./components/card";
import { DataInterface } from "./interfaces/data";

const App: React.FC = () => {
    const [topIndex, setTopIndex] = useState<number>(0);
    const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [startX, setStartX] = useState<number>(0);
    const [startY, setStartY] = useState<number>(0);
    const [transitioning, setTransitioning] = useState<boolean>(false);

    const cardRef = useRef<HTMLDivElement>(null);

    const SWIPE_X = 50;
    const SWIPE_Y = 70;

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        setPos({ x: deltaX, y: deltaY });
    };

    const handleMouseUp = () => {
        handleSwipeEnd();
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;
        setPos({ x: deltaX, y: deltaY });
    };

    const handleTouchEnd = () => {
        handleSwipeEnd();
    };

    const handleSwipeEnd = () => {
        setIsDragging(false);

        if (pos.x > SWIPE_X || pos.x < -SWIPE_X) {
            setTransitioning(true);
            if (cardRef.current) {
                cardRef.current.style.transition = "transform 0.8s ease";
            }
            console.log(pos.x > 0 ? "Liked" : "Disliked");
            setPos({ x: pos.x > 0 ? 700 : -700, y: pos.y });

            setTimeout(() => {
                setTopIndex((prev) => Math.min(prev + 1, data.length - 1));
                setPos({ x: 0, y: 0 });
                setTransitioning(false);
            }, 300);
        } else if (pos.y < -SWIPE_Y) {
            setTransitioning(true);
            console.log("Added to cart");
            setPos({ x: 0, y: -900 });

            setTimeout(() => {
                setTopIndex((prev) => Math.min(prev + 1, data.length - 1));
                setPos({ x: 0, y: 0 });
                setTransitioning(false);
            }, 300);
        } else {
            setPos({ x: 0, y: 0 });
        }
    };

    return (
        <div
            className="w-full h-screen flex justify-center overflow-hidden relative"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {data.slice(topIndex).map((card: DataInterface, i: number) => {
                const isTop = i === 0;
                const isSecond = i === 1;
                return (
                    <Card
                        key={card.id || i}
                        data={card}
                        topIndex={topIndex}
                        isTop={isTop}
                        isSecond={isSecond}
                        pos={pos}
                        isDragging={isDragging}
                        setIsDragging={setIsDragging}
                        setStartX={setStartX}
                        setStartY={setStartY}
                        index={i}
                        ref={isTop ? cardRef : null}
                        transitioning={transitioning}
                    />
                );
            })}
        </div>
    );
};

export default App;
