import { CSSValue } from "./CSSValue";
import { Points } from "./Points";

export type Stroke = {
    color: CSSValue,

    size: Points,

    radius?: Points,

    /**
     * A CSS [border style](https://developer.mozilla.org/en-US/docs/Web/CSS/border-style).
     */
    style?: string,
};