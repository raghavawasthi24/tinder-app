import React, { useState } from "react";
import "./App.css";

const cards = ["Card 1", "Card 2", "Card 3", "Card 4"];

const App = () => {
    const [topIndex, setTopIndex] = useState(0);
    const [pos, setPos] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.clientX);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        const deltaX = e.clientX - startX;
        setPos(deltaX);
    };

    const handleMouseUp = () => {
        setIsDragging(false);

        if (pos > 150 || pos < -150) {
            console.log(pos > 0 ? "Swiped Right!" : "Swiped Left!");
            // Animate out and then move to next card
            setPos(pos > 0 ? 500 : -500);
            setTimeout(() => {
                setTopIndex((prev) => Math.min(prev + 1, cards.length - 1));
                setPos(0);
            }, 300);
        } else {
            setPos(0); // reset to center
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
                        key={card}
                        className={`w-[300px] h-[400px] rounded-2xl shadow-lg absolute bg-white flex items-center justify-center text-xl font-bold transition-transform duration-300 ease-in-out ${
                            isTop ? "z-20" : "z-10 scale-[0.95] translate-y-4"
                        }`}
                        style={{
                            transform: isTop
                                ? `translateX(${pos}px)`
                                : undefined,
                            backgroundColor: `hsl(${
                                (topIndex + i) * 60
                            }, 70%, 60%)`,
                            cursor: isTop ? "grab" : "default",
                        }}
                        onMouseDown={isTop ? handleMouseDown : undefined}
                    >
                        {card}
                    </div>
                );
            })}
        </div>
    );
};

export default App;
