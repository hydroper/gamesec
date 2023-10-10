import { Vector } from "com.hydroper.gamesec.core";
import { Margin, MarginOrPadding, Padding, RectangleSkin, RectangleStroke, RectangleStroke4, Transition, TransitionProperty } from "../skins";
import { Application, Button, ButtonState, FontSkin } from "./Controls";
import pointsInCSS from "../skins/pointsInCSS";
import { Stroke } from "../skins/Stroke";

/**
 * @hidden
 */
export default class StylesheetBuilder {
    // Default theme font
    private defaultFont: string;

    // Output text
    private readonly output: string[] = [];

    constructor({defaultFont}: {
        defaultFont: string,
    }) {
        this.defaultFont = defaultFont;
    }

    push(text: string) {
        this.output.push(text);
    }

    build() {
        return this.output.join("");
    }

    resets() {
        return (
            "margin: 0;" +
            `padding: 0;` +
            `border: 0;`
        );
    }

    buildFont(skin: FontSkin, emitDefaultFont: boolean) {
        return (
            (skin.fontColor !== undefined ? `color: ${skin.fontColor};` : "") +
            (emitDefaultFont ? `font-family: ${skin.font ?? this.defaultFont};` : "") +
            (!emitDefaultFont && skin.font !== undefined ? `font-family: ${skin.font};` : "") +
            (skin.fontSize !== undefined ? `font-size: ${skin.fontSize};` : "")
        );
    }

    buildTransitions(transitions: Transition[] | undefined) {
        if (transitions === undefined || transitions.length == 0) {
            return "";
        }
        const single = (tr: Transition) => {
            const prop = transitionPropertyAsCSSProperty[tr.property];
            return (
                `transition-property: ${prop};` +
                `transition-duration: ${tr.duration};` +
                (tr.easing !== undefined ? `transition-timing-function: ${tr.easing};` : "") +
                (tr.delay !== undefined ? `transition-delay: ${tr.delay};` : "")
            );
        };
        return `transition: ${transitions.map(single)};`;
    }

    buildPaddingOrMargin(property: string, mp: MarginOrPadding | undefined) {
        if (mp === undefined) {
            return "";
        }
        if (mp instanceof Vector) {
            return `${property}: ${pointsInCSS(mp.y)} ${pointsInCSS(mp.x)};`;
        }
        if (typeof mp == "number") {
            return `${property}: ${pointsInCSS(mp)};`;
        }
        return (
            (mp.left !== undefined ? `${property}-left: ${pointsInCSS(mp.left)}` : "") +
            (mp.right !== undefined ? `${property}-right: ${pointsInCSS(mp.right)}` : "") +
            (mp.top !== undefined ? `${property}-top: ${pointsInCSS(mp.top)}` : "") +
            (mp.bottom !== undefined ? `${property}-bottom: ${pointsInCSS(mp.bottom)}` : "")
        );
    }

    buildPadding(padding: Padding | undefined) {
        return this.buildPaddingOrMargin("padding", padding);
    }

    buildMargin(margin: Margin | undefined) {
        return this.buildPaddingOrMargin("margin", margin);
    }

    buildRectangle(skin: RectangleSkin) {
        return (
            (skin.background === undefined ? `background: ${skin.background};` : "") +
            this.buildRectangleStroke(skin.stroke)
        );
    }

    buildRectangleStroke(stroke: RectangleStroke | undefined) {
        if (stroke === undefined) {
            return "";
        }
        if (stroke.hasOwnProperty("size")) {
            const strokeA = stroke as Stroke;
            return (
                `border: ${pointsInCSS(strokeA.size)} ${strokeA.style} ${strokeA.color};` +
                (strokeA.radius !== undefined ? `border-radius: ${pointsInCSS(strokeA.radius)};` : "")
            );
        }
        const strokeA = stroke as RectangleStroke4;
        return (
            (strokeA.left !== undefined ? `border-left: ${pointsInCSS(strokeA.left.size)} ${strokeA.left.style} ${strokeA.left.color};` : "") +
            (strokeA.right !== undefined ? `border-right: ${pointsInCSS(strokeA.right.size)} ${strokeA.right.style} ${strokeA.right.color};` : "") +
            (strokeA.top !== undefined ? `border-top: ${pointsInCSS(strokeA.top.size)} ${strokeA.top.style} ${strokeA.top.color};` : "") +
            (strokeA.bottom !== undefined ? `border-bottom: ${pointsInCSS(strokeA.bottom.size)} ${strokeA.bottom.style} ${strokeA.bottom.color};` : "") +

            (strokeA.topLeftRadius !== undefined ? `border-top-left-radius: ${pointsInCSS(strokeA.topLeftRadius)};` : "") +
            (strokeA.topRightRadius !== undefined ? `border-top-right-radius: ${pointsInCSS(strokeA.topRightRadius)};` : "") +
            (strokeA.bottomLeftRadius !== undefined ? `border-bottom-left-radius: ${pointsInCSS(strokeA.bottomLeftRadius)};` : "") +
            (strokeA.bottomRightRadius !== undefined ? `border-bottom-right-radius: ${pointsInCSS(strokeA.bottomRightRadius)};` : "")
        );
    }

    buildApplication(skin: Application) {
        return (
            this.resets() +
            "user-select: none;" +
            this.buildFont(skin, true) +
            (skin.background !== undefined ? `background: ${skin.background ?? "#fff"};` : "")
        );
    }

    buildButton(skin: Button) {
        return (
            this.resets() +
            "user-select: none;" +
            this.buildFont(skin, true) +
            this.buildPadding(skin.padding) +
            this.buildMargin(skin.margin) +
            this.buildTransitions(skin.transitions) +
            this.buildButtonState(skin?.normal ?? {})
        );
    }

    buildButtonState(skin: ButtonState) {
        return (
            this.buildRectangle(skin) +
            this.buildFont(skin, false)
        );
    }
}

const transitionPropertyAsCSSProperty: Record<TransitionProperty, string> = {
    "background": "background",
    "stroke": "border",
    "fontColor": "color",
    "fontSize": "font-size",
    "margin": "margin",
    "marginLeft": "margin-left",
    "marginRight": "margin-right",
    "marginTop": "margin-top",
    "marginBottom": "margin-bottom",
    "padding": "padding",
    "paddingLeft": "padding-left",
    "paddingRight": "padding-right",
    "paddingTop": "padding-top",
    "paddingBottom": "padding-bottom",
};