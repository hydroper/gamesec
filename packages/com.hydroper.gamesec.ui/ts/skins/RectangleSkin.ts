import { CSSValue } from "./CSSValue";
import { Margin } from "./Margin";
import { Padding } from "./Padding";
import { RectangleStroke } from "./RectangleStroke";

export type RectangleSkin = {
    fill?: CSSValue,
    stroke?: RectangleStroke,
    margin?: Margin,
    padding?: Padding,
};