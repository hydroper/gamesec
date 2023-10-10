import { EventEmitter, Vector } from "com.hydroper.gamesec.core";
import Control from "./Control";
import { MouseEvent } from "../events";
import { navigatorMouseEventToThis } from "../events/MouseEvent";

export default class Button extends Control {
    focusable = true;

    /**
     * Whether the button is disabled.
     */
    get disabled(): boolean {
        return (this.nativeElement as HTMLButtonElement).disabled;
    }
    set disabled(value) {
        (this.nativeElement as HTMLButtonElement).disabled = value;
    }

    private mLevel: "primary" | "secondary" | "danger" = "primary";

    /**
     * Whether it is a primary button.
     */
    get primary() {
        return this.mLevel == "primary";
    }
    set primary(value) {
        this.mLevel = value ? "primary" : this.mLevel;
        this.applySingleTheme(this);
    }

    /**
     * Whether it is a secondary button.
     */
    get secondary() {
        return this.mLevel == "secondary";
    }
    set secondary(value) {
        this.mLevel = value ? "secondary" : this.mLevel;
        this.applySingleTheme(this);
    }

    /**
     * Whether it is a danger button.
     */
    get danger() {
        return this.mLevel == "danger";
    }
    set danger(value) {
        this.mLevel = value ? "danger" : this.mLevel;
        this.applySingleTheme(this);
    }

    protected get themeClass(): string {
        switch (this.mLevel) {
            // "camelCase" cases
            // ...

            // Non-camel-case case
            default: return "button-" + this.mLevel;
        }
    }

    /**
     * Press event.
     */
    readonly onPressed = new EventEmitter<MouseEvent>();

    /**
     * Mouse up event. This event is emitted when the mouse
     * starts pressing the control.
     */
    readonly onMouseDown = new EventEmitter<MouseEvent>();

    /**
     * Mouse up event. This event is emitted when the mouse
     * cancels pressing the control.
     */
    readonly onMouseUp = new EventEmitter<MouseEvent>();

    /**
     * Mouse over event.
     */
    readonly onMouseOver = new EventEmitter<MouseEvent>();

    /**
     * Mouse out event.
     */
    readonly onMouseOut = new EventEmitter<MouseEvent>();

    constructor() {
        super(document.createElement("button"));
        this.nativeElement.addEventListener("click", e => {
            this.onPressed.emit(navigatorMouseEventToThis(e));
        });
        this.nativeElement.addEventListener("mousedown", e => {
            this.onMouseDown.emit(navigatorMouseEventToThis(e));
        });
        this.nativeElement.addEventListener("mouseup", e => {
            this.onMouseUp.emit(navigatorMouseEventToThis(e));
        });
        this.nativeElement.addEventListener("mouseover", e => {
            this.onMouseOver.emit(navigatorMouseEventToThis(e));
        });
        this.nativeElement.addEventListener("mouseout", e => {
            this.onMouseOut.emit(navigatorMouseEventToThis(e));
        });
    }

    /**
     * Text contained inside the button. It is alternatively
     * possible to insert a `Label` child containing the text.
     */
    get text(): string {
        return this.nativeElement.innerText;
    }
    set text(value) {
        this.nativeElement.innerText = value;
    }
}