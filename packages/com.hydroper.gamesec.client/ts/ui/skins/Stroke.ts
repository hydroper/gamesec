import { CSSValue } from "./CSSValue";
import { Point } from "./Points";

export type Stroke = {
    color?: CSSValue,
    size: Point,
    radius?: Point,
};