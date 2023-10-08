import { CSSValue } from "./CSSValue";

export type Transition = {
    property: "fill" | "stroke" | "textColor"
        | "margin" | "marginLeft" | "marginRight" | "marginTop" | "marginBottom"
        | "padding" | "paddingLeft" | "paddingRight" | "paddingTop" | "paddingBottom",

    /**
     * [CSS easing function.](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function)
     */
    easing?: string,

    /**
     * Duration as [CSS time.](https://developer.mozilla.org/en-US/docs/Web/CSS/time)
     */
    duration: CSSValue,

    /**
     * Delay as [CSS time.](https://developer.mozilla.org/en-US/docs/Web/CSS/time)
     */
    delay?: CSSValue,
};