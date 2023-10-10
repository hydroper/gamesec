import { Points } from "./Points";
import { Stroke } from "./Stroke";

export type RectangleStroke =
    | Stroke
    | RectangleStroke4;

export type RectangleStroke4 = {
    left?: Stroke,
    right?: Stroke,
    top?: Stroke,
    bottom?: Stroke,

    topLeftRadius: Points,
    topRightRadius: Points,
    bottomLeftRadius: Points,
    bottomRightRadius: Points,
};