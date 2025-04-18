import React, { useState } from "react";
import "./App.css";

const cards = [
    "Card 1",
    "Card 2",
    "Card 3",
    "Card 4",
    "Card 1",
    "Card 2",
    "Card 3",
    "Card 4",
];

const App = () => {
    const [topIndex, setTopIndex] = useState(0);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.clientX);
        setStartY(e.clientY);

        e.preventDefault();
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        setPos({ x: deltaX, y: deltaY });
    };

    const handleMouseUp = () => {
        setIsDragging(false);

        const SWIPE_X = 150;
        const SWIPE_Y = 200;

        if (pos.x > SWIPE_X || pos.x < -SWIPE_X) {
            console.log(pos.x > 0 ? "Swiped Right (X)" : "Swiped Left (X)");
            setPos({ x: pos.x > 0 ? 500 : -500, y: pos.y });
            setTimeout(() => {
                setTopIndex((prev) => Math.min(prev + 1, cards.length - 1));
                setPos({ x: 0, y: 0 });
            }, 300);
        } else if (pos.y < -SWIPE_Y) {
            console.log("Swiped Up (Y)");
            setPos({ x: 0, y: -700 });
            setTimeout(() => {
                setTopIndex((prev) => Math.min(prev + 1, cards.length - 1));
                setPos({ x: 0, y: 0 });
            }, 300);
        } else {
            setPos({ x: 0, y: 0 });
        }
    };

    return (
        <div
            className="w-full h-screen flex items-center justify-center overflow-hidden relative"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            {cards.slice(topIndex).map((card, i) => {
                const isTop = i === 0;
                return (
                    <div
                        key={topIndex + i}
                        className={`w-[300px] h-[400px] rounded-2xl shadow-lg absolute bg-white flex items-center justify-center text-xl font-bold ${
                            isTop
                                ? "z-20 transition-transform duration-100 ease-in-out"
                                : "z-10 scale-[0.95] translate-y-4"
                        }`}
                        style={{
                            transform: isTop
                                ? `translateX(${pos.x}px) translateY(${pos.y}px)`
                                : undefined,
                            backgroundColor: `hsl(${
                                (topIndex + i) * 60
                            }, 70%, 60%)`,
                            cursor: isTop ? "grab" : "default",
                        }}
                        onMouseDown={isTop ? handleMouseDown : undefined}
                        onDragStart={(e) => e.preventDefault()} // no ghost
                    >
                        {card}
                    </div>
                );
            })}
        </div>
    );
};

export default App;
