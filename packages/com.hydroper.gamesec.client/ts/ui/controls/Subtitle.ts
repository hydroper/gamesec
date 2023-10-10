import assert from "assert";
import Control from "./Control";

/**
 * Displays a subtitle.
 */
export default class Subtitle extends Control {
    // Theme class
    protected themeClass = "subtitle";

    // Focusable
    readonly focusable = false;

    constructor(text: string = "") {
        super(document.createElement("span"));
        this.text = text;
    }

    /**
     * The text contained by this title.
     */
    get text(): string {
        return this.nativeElement.innerText;
    }
    set text(value) {
        this.nativeElement.innerText = value;
    }
}