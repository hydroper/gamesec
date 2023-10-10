import Control from "./Control";

/**
 * Displays text, possibly selectable.
 */
export default class Label extends Control {
    // Theme class
    readonly themeClass = "label";

    // Focusable
    readonly focusable = false;

    constructor(text: string = "") {
        super(document.createElement("span"));
        this.text = text;
    }

    /**
     * The text contained by this label.
     */
    get text(): string {
        return this.nativeElement.innerText;
    }
    set text(value) {
        this.nativeElement.innerText = value;
    }
}