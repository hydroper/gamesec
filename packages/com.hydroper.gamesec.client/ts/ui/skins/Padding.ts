import { Point } from "./Point";

export type Padding = Point | {
    left?: Point,
    right?: Point,
    top?: Point,
    bottom?: Point,
};