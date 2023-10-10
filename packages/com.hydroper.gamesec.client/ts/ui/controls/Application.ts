import assert from "assert";
import Control from "./Control";
import { metroTheme } from "../themes";

const constructorKey = Symbol("constructorKey");

/**
 * The top control of the user interface hierarchy. This control
 * must not be constructed as its single instance is available
 * in the `gamesec.ui.application` property.
 * 
 * # Default theme
 * 
 * GameSec initially sets the application theme as follows:
 * 
 * ```
 * import { ui } from "com.hydroper.gamesec.client";
 *
 * // Theme based on Microsoft's Metro design
 * ui.application.theme = ui.themes.metroTheme;
 * ```
 */
export default class Application extends Control {
    // Theme class
    protected readonly themeClass = "application";

    // Focusable
    readonly focusable = false;

    constructor(doNotConstruct: Symbol) {
        super(document.createElement("div"));
        assert(doNotConstruct === constructorKey, "The 'Application' control must not be constructed; use 'gamesec.ui.application' instead");

        // Modify the document's <body/> element
        document.body.prepend(this.nativeElement);
        document.body.style.margin = "0";
        document.body.style.padding = "0";
        document.body.style.width = "100%";
        document.body.style.height = "100%";

        // Set the default theme
        this.theme = metroTheme;
    }
}

/**
 * The GameSec user interface's application.
 */
export const application = new Application(constructorKey);