import { ThemeControls } from "./ThemeControls";

/**
 * An user interface theme.
 */
export class Theme {
    private mStyle: HTMLStyleElement;
    private mPrefix: string;

    /**
     * Constructs a theme.
     * 
     * Constructing a theme will add an anonymous stylesheet to the document
     * that uses `.themeClass-theme-` as a prefix for all selectors.
     *
     * @param themeClass The theme's CSS class.
     */
    constructor(
        public readonly themeClass: string,
        public readonly controls: ThemeControls,
    ) {
        // Set stylesheet class prefix
        this.mPrefix = `.${this.themeClass}-theme-`;

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

        // prefix-root
        builder.push(
            `${prefix}-root {` +
                "user-select: none;" +
            "}"
        );

        toDo();

        return builder.join("");
    }
}