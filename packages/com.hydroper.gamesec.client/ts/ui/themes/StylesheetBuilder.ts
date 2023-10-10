import { Transition, TransitionProperty } from "../skins";
import { Application, Button, ButtonState, FontSkin } from "./Controls";

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
                (tr.delay !== undefined ? `transition-delay: ${tr.delay}` : "")
            );
        };
        return `transition: ${transitions.map(single)};`;
    }

    buildApplication(skin: Application) {
        return (
            this.resets() +
            "user-select: none;" +
            `font-family: ${this.defaultFont};` +
            this.buildFont(skin, false) +
            `background: ${skin.background ?? "#fff"};`
        );
    }

    buildButton(skin: Button) {
        return (
            this.resets() +
            this.buildFont(skin, true) +
            "user-select: none;" +
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