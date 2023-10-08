import { Stroke } from "./Stroke";

export type RectangleStroke =
    | Stroke
    | {
        left?: Stroke,
        right?: Stroke,
        top?: Stroke,
        bottom?: Stroke,
    };