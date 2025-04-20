import React, { forwardRef } from "react";
import { formatText } from "../helper/formatText";
import { DataInterface } from "../interfaces/data";

interface CardProps {
    data: DataInterface;
    topIndex: number;
    isTop: boolean;
    isSecond: boolean;
    pos: { x: number; y: number };
    isDragging: boolean;
    setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
    setStartX: React.Dispatch<React.SetStateAction<number>>;
    setStartY: React.Dispatch<React.SetStateAction<number>>;
    index: number;
    transitioning: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
    (
        {
            data,
            topIndex,
            isTop,
            isSecond,
            pos,
            isDragging,
            setIsDragging,
            setStartX,
            setStartY,
            index,
            transitioning,
        },
        ref
    ) => {
        const handleMouseDown = (e: React.MouseEvent) => {
            setIsDragging(true);
            setStartX(e.clientX);
            setStartY(e.clientY);
            e.preventDefault();
        };

        const handleTouchStart = (e: React.TouchEvent) => {
            setIsDragging(true);
            const touch = e.touches[0];
            setStartX(touch.clientX);
            setStartY(touch.clientY);
        };

        return (
            <div
                key={topIndex + index}
                ref={ref}
                className={`w-full h-[98%] rounded-2xl overflow-hidden shadow-lg absolute bg-white 
        flex flex-col justify-between text-black transition-transform duration-500 
        ${isTop ? "z-20 cursor-grab" : isSecond ? "z-10" : "opacity-0"}
        ${!isTop && !isSecond ? "translate-y-[6px]" : ""}
    `}
                style={{
                    transform: isTop
                        ? `translateX(${pos.x}px) translateY(${
                              pos.y
                          }px) rotate(${-pos.x / 20}deg)`
                        : isSecond && !transitioning
                        ? `translateY(6px)`
                        : "translateY(0px)",
                    transition: isTop
                        ? isDragging
                            ? "transform 0s ease"
                            : "transform 0.5s ease"
                        : "transform 0.5s ease",
                }}
                onMouseDown={isTop ? handleMouseDown : undefined}
                onTouchStart={isTop ? handleTouchStart : undefined}
                onDragStart={(e) => e.preventDefault()}
            >
                <div className="w-full h-full relative">
                    <img
                        src={data.imageUrl}
                        alt=""
                        className="w-full h-[88%] object-cover object-top"
                    />

                    {/* product details e.g brand, price */}
                    <div className="p-2">
                        <p className="text-lg">{formatText(data.name)}</p>
                        <p className="text-sm">{formatText(data.brand)}</p>

                        <div className="flex gap-2 items-center">
                            <span className="font-semibold">₹{data.price}</span>
                            <span className="line-through text-sm">
                                ₹{data.originalPrice}
                            </span>
                            <span className="text-sm text-green-700">{`${data.discountPercentage}%`}</span>
                        </div>
                    </div>

                    {/* conditionally rendering action text */}
                    <div className="font-extrabold text-6xl">
                        {(() => {
                            if (isTop) {
                                // if card is swiped up
                                if (pos.y < -10) {
                                    return (
                                        <p className="absolute bottom-25 inset-x-0 text-center text-rose-400">
                                            Add to cart
                                        </p>
                                    );
                                    //else if card is swiped left
                                } else if (pos.x < -10) {
                                    return (
                                        <p className="absolute top-5 right-5 text-red-700">
                                            Dislike
                                        </p>
                                    );
                                    //else if card is swiped right
                                } else if (pos.x > 10) {
                                    return (
                                        <p className="absolute top-5 left-5 text-green-700">
                                            Like
                                        </p>
                                    );
                                }
                            }
                            return null;
                        })()}
                    </div>
                </div>
            </div>
        );
    }
);

Card.displayName = "Card";
