import { CSSValue } from "./CSSValue";
import { Point } from "./Point";

export type Stroke = {
    color?: CSSValue,
    size: Point,
    radius?: Point,
};