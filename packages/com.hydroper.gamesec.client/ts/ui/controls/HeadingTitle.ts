import assert from "assert";
import Control from "./Control";

/**
 * Displays a heading title.
 */
export default class HeadingTitle extends Control {
    // Theme class
    protected get themeClass(): string {
        // heading-title-n
        return `heading-title-${this.level}`;
    }

    // Focusable
    readonly focusable = false;

    /**
     * @param level Heading title's level, ranging from 1 to 4.
     */
    constructor(public readonly level: number, text: string = "") {
        level = Math.round(level);
        assert(level >= 1 && level <= 4, "HeadingTitle's level must span from 1 to 4 (inclusive)");
        super(document.createElement(`h${level}`));
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