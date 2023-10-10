import Control from "./Control";

/**
 * Displays a paragraph, possibly selectable.
 */
export default class Paragraph extends Control {
    // Theme class
    protected readonly themeClass = "paragraph";

    // Focusable
    readonly focusable = false;

    constructor(text: string = "") {
        super(document.createElement("p"));
        this.text = text;
    }

    /**
     * The text contained by this paragraph.
     */
    get text(): string {
        return this.nativeElement.innerText;
    }
    set text(value) {
        this.nativeElement.innerText = value;
    }
}