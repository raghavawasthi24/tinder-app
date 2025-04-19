interface CardProps {
    data: string;
    topIndex: number;
    isTop: boolean;
    isSecond: boolean;
    pos: { x: number; y: number };
    setIsDragging: (isDragging: boolean) => void;
    setStartX: (startX: number) => void;
    setStartY: (startY: number) => void;
    index: number;
}

export const Card = ({
    data,
    topIndex,
    isTop,
    isSecond,
    pos,
    setIsDragging,
    setStartX,
    setStartY,
    index,
}: CardProps) => {
    // Mouse events
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.clientX);
        setStartY(e.clientY);
        e.preventDefault();
    };

    // Touch events
    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        const touch = e.touches[0];
        setStartX(touch.clientX);
        setStartY(touch.clientY);
    };

    return (
        <div
            key={topIndex + index}
            className={`w-full h-[90%] rounded-2xl shadow-lg absolute bg-white flex items-center justify-center text-xl font-bold ${
                isTop
                    ? "z-20 transition-transform ease-in-out"
                    : isSecond
                    ? "z-15 translate-y-2"
                    : "opacity-0"
            }`}
            style={{
                transform: isTop
                    ? `translateX(${pos.x}px) translateY(${pos.y}px)`
                    : undefined,
                backgroundColor: `hsl(${(topIndex + index) * 60}, 70%, 60%)`,
                cursor: isTop ? "grab" : "default",
            }}
            onMouseDown={isTop ? handleMouseDown : undefined}
            onTouchStart={isTop ? handleTouchStart : undefined}
            onDragStart={(e) => e.preventDefault()} // prevent image ghost drag
        >
            {data}
        </div>
    );
};
