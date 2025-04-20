import { formatText } from "../helper/formatText";

interface CardProps {
    data: any;
    topIndex: number;
    isTop: boolean;
    isSecond: boolean;
    pos: { x: number; y: number };
    isDragging: boolean;
    setIsDragging: (isDragging: boolean) => void;
    setStartX: (startX: number) => void;
    setStartY: (startY: number) => void;
    index: number;
    ref: any;
    transitioning: boolean;
}

export const Card = ({
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
    ref,
    transitioning,
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
            ref={ref}
            className={`w-full h-[90%] rounded-2xl overflow-hidden shadow-lg absolute bg-white flex flex-col justify-between text-black ${
                isTop ? "z-20" : isSecond ? "z-15" : "opacity-0"
            }`}
            style={{
                transform: isTop
                    ? `translateX(${pos.x}px) translateY(${pos.y}px) rotate(${
                          -pos.x / 20
                      }deg)`
                    : isSecond
                    ? `translateY(${transitioning ? "0px" : "6px"})`
                    : "translateY(6px)",
                transition: isTop
                    ? isDragging
                        ? "transform 0s ease"
                        : "transform 0.5s ease"
                    : "transform 0.5s ease",
                cursor: isTop ? "grab" : "default",
            }}
            onMouseDown={isTop ? handleMouseDown : undefined}
            onTouchStart={isTop ? handleTouchStart : undefined}
            onDragStart={(e) => e.preventDefault()}
        >
            <img
                src={data.imageUrl}
                alt=""
                className="w-full h-[88%] object-cover"
            />

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
        </div>
    );
};
