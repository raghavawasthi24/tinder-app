import React, { useState } from "react";
import "./App.css";
import { data } from "./constants/data";
import { Card } from "./components/card";

const App = () => {
    const [topIndex, setTopIndex] = useState(0);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [lastActioned, setLastActioned] = useState<any>("");
    const [id, setId] = useState<any>(null);

    const cardRef = React.useRef<any>(null);    

    const SWIPE_X = 200;
    const SWIPE_Y = 400;

    // Mouse events

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        setPos({ x: deltaX, y: deltaY });
    };

    const handleMouseUp = () => {
        handleSwipeEnd();
    };

    // Touch events

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;
        setPos({ x: deltaX, y: deltaY });
    };

    const handleTouchEnd = () => {
        handleSwipeEnd();
    };

    // Shared logic
    const handleSwipeEnd = () => {
        setIsDragging(false);
        clearTimeout(id);

        if (pos.x > SWIPE_X || pos.x < -SWIPE_X) {
            cardRef.current.style.transition = "transform 0.8s ease";
            console.log(
                pos.x > 0
                    ? setLastActioned("Swiped Right")
                    : setLastActioned("Swiped Left")
            );
            setPos({ x: pos.x > 0 ? 700 : -700, y: pos.y });
            setTimeout(() => {
                setTopIndex((prev) => Math.min(prev + 1, data.length - 1));
                setPos({ x: 0, y: 0 });
            }, 300);
        } else if (pos.y < -SWIPE_Y) {
            setLastActioned("Swiped Up");
            setPos({ x: 0, y: -900 });
            setTimeout(() => {
                setTopIndex((prev) => Math.min(prev + 1, data.length - 1));
                setPos({ x: 0, y: 0 });
            }, 300);
        } else {
            setPos({ x: 0, y: 0 });
        }

        const intervalID = setTimeout(() => {
            setLastActioned("");
        }, 2000);

        setId(intervalID);
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
            {data.slice(topIndex).map((card, i) => {
                // console.log("Rendering card", card);
                const isTop = i === 0;
                const isSecond = i === 1;
                return (
                    <Card
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
                        ref={ cardRef}
                    />
                );
            })}

            <div className="absolute bottom-0 z-20 text-black text-2xl">
                {lastActioned}
            </div>
        </div>
    );
};

export default App;
