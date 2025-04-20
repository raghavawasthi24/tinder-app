import { DataInterface } from "./data";

export interface CardInterface {
    data: DataInterface;
    topIndex: number;
    isTop: boolean;
    isSecond: boolean;
    pos: { x: number; y: number };
    isDragging: boolean;
    setIsDragging: (isDragging: boolean) => void;
    setStartX: (startX: number) => void;
    setStartY: (startY: number) => void;
    index: number;
    ref: Ref<HTMLDivElement> | undefined;
    transitioning: boolean;
}
