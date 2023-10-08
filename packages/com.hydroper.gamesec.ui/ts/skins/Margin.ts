import { Point } from "./Point";

export type Margin = Point | {
    left?: Point,
    right?: Point,
    top?: Point,
    bottom?: Point,
};