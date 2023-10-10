import assert from "assert";
import Control from "./Control";

const constructorKey = Symbol("constructorKey");

/**
 * The top control of the user interface hierarchy. This control
 * must not be constructed as its single instance is available
 * in the `gamesec.ui.application` property.
 */
export default class Application extends Control {
    // Theme class
    readonly themeClass = "application";

    // Focusable
    readonly focusable = false;

    constructor(doNotConstruct: Symbol) {
        super(document.createElement("div"));
        assert(doNotConstruct === constructorKey, "The 'Application' control must not be constructed; use 'gamesec.ui.application' instead");
        document.body.appendChild(this.nativeElement);
    }
}

/**
 * The GameSec user interface application.
 */
export const application = new Application(constructorKey);