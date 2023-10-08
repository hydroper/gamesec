import { ThemeControls } from "./ThemeControls";
import { ThemeFonts } from "./ThemeFonts";

/**
 * An user interface theme.
 */
export class Theme {
    private mStyle: HTMLStyleElement;
    private mPrefix: string;

    readonly controls: ThemeControls;
    readonly fonts: ThemeFonts;
    readonly defaultFont: string;

    /**
     * Constructs a theme.
     * 
     * Constructing a theme will add an anonymous stylesheet to the document
     * that uses `.themeClass-t-` as a prefix for all selectors.
     *
     * @param themeClass The theme's CSS class.
     */
    constructor(
        public readonly themeClass: string,
        public readonly options: ThemeOptions,
    ) {
        this.controls = options.controls;
        this.fonts = options.fonts;
        this.defaultFont = options.defaultFont;

        // Set stylesheet class prefix
        this.mPrefix = `.${this.themeClass}-t-`;

        // Add a stylesheet to the document
        this.mStyle = document.createElement("style");
        this.mStyle.innerText = this.buildStylesheet();
        document.head.appendChild(this.mStyle);
    }

    /**
     * Unloads the stylesheet that was added to the document
     * when the theme was constructed.
     */
    unload() {
        this.mStyle.remove();
    }

    private buildStylesheet() {
        const prefix = this.mPrefix;
        const builder: string[] = [];

        // prefix-reset
        builder.push(
            `${prefix}-reset {` +
                "margin: 0;" +
                "padding: 0;" +
                "border: 0;" +
            "}"
        );

        // prefix-application
        builder.push(
            `${prefix}-application {` +
                "user-select: none;" +
                `font-family: ${this.defaultFont};` +
            "}"
        );

        // prefix-button
        toDo();

        // prefix-label
        toDo();

        return builder.join("");
    }
}

export type ThemeOptions = {
    controls: ThemeControls,
    fonts: ThemeFonts,

    /**
     * Default CSS font family.
     */
    defaultFont: string,
};