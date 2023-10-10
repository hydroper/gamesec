import { Button, ButtonState, Controls, FontSkin } from "./Controls";
import { Fonts } from "./Fonts";
import StylesheetBuilder from "./StylesheetBuilder";

/**
 * An user interface theme.
 */
export class Theme {
    private mStyle: HTMLStyleElement;
    private mStyleBuilder: StylesheetBuilder;
    private mPrefix: string;

    readonly controls: Controls;
    readonly fonts: Fonts;
    readonly defaultFont: string;

    /**
     * Constructs a theme.
     * 
     * Constructing a theme will add an anonymous stylesheet to the document
     * that uses `.themeClass-t-` as a prefix for all classes.
     *
     * @param themeClass The CSS class prefix of the theme to construct.
     */
    constructor(
        public readonly themeClass: string,
        public readonly options: ThemeOptions,
    ) {
        this.controls = options.controls;
        this.fonts = options.fonts;
        this.defaultFont = options.defaultFont ?? "serif";

        // Set stylesheet class prefix
        this.mPrefix = `.${this.themeClass}-t-`;

        // Create the builder
        this.mStyleBuilder = new StylesheetBuilder({
            defaultFont: this.defaultFont,
        });

        // Add a stylesheet to the document
        this.mStyle = document.createElement("style");
        this.mStyle.innerText = this.buildStylesheet();
        document.head.appendChild(this.mStyle);
    }

    /**
     * Returns the CSS selector prefix, starting with a dot (`.`).
     */
    get prefix() {
        return this.mPrefix;
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
        const builder = this.mStyleBuilder;

        this.buildApplication();
        this.buildButton();
        this.buildLabel();
        this.buildHeadingTitle();
        this.buildSubtitle();

        return this.mStyleBuilder.build();
    }

    private buildApplication() {
        const prefix = this.mPrefix;
        const builder = this.mStyleBuilder;

        builder.push(
            `${prefix}application {` +
                (this.controls.application !== undefined ? builder.buildApplication(this.controls.application) : "") +
            "}"
        );
    }

    private buildButton() {
        const prefix = this.mPrefix;
        const builder = this.mStyleBuilder;

        const buildLevel = (level: string, skin: Button) => {
            builder.push(`${prefix}button-${level} {` + builder.buildButton(skin) + "}");
            if (skin.hovered !== undefined) {
                builder.push(`${prefix}button-${level}:hover {` + builder.buildButton(skin.hovered) + "}");
            }
            if (skin.disabled !== undefined) {
                builder.push(`${prefix}button-${level}:disabled {` + builder.buildButton(skin.disabled) + "}");
            }
            if (skin.pressed !== undefined) {
                builder.push(`${prefix}button-${level}:active {` + builder.buildButton(skin.pressed) + "}");
            }
            if (skin.focused !== undefined) {
                builder.push(`${prefix}button-${level}:focus {` + builder.buildButton(skin.focused) + "}");
            }
        };

        buildLevel("primary", this.controls.button?.primary ?? {});
        buildLevel("secondary", this.controls.button?.primary ?? {});
        buildLevel("danger", this.controls.button?.danger ?? {});
    }

    private buildLabel() {
        const prefix = this.mPrefix;
        const builder = this.mStyleBuilder;

        const selectedStyle = builder.buildLabelState(this.controls.label?.selected ?? {}, false);

        builder.push(`${prefix}label {` + builder.buildLabel(this.controls.label ?? {}) + "}");
        builder.push(`${prefix}label::selection {` + selectedStyle + "}");
        builder.push(`${prefix}label::-moz-selection {` + selectedStyle + "}");
        builder.push(`${prefix}label::-webkit-selection {` + selectedStyle + "}");
    }

    private buildHeadingTitle() {
        const prefix = this.mPrefix;
        const builder = this.mStyleBuilder;

        builder.push(`${prefix}heading-title-1 {` + builder.buildHeadingTitle(this.controls.headingTitle?.heading1 ?? {}) + "}");
        builder.push(`${prefix}heading-title-2 {` + builder.buildHeadingTitle(this.controls.headingTitle?.heading2 ?? {}) + "}");
        builder.push(`${prefix}heading-title-3 {` + builder.buildHeadingTitle(this.controls.headingTitle?.heading3 ?? {}) + "}");
        builder.push(`${prefix}heading-title-4 {` + builder.buildHeadingTitle(this.controls.headingTitle?.heading4 ?? {}) + "}");
    }

    private buildSubtitle() {
        const prefix = this.mPrefix;
        const builder = this.mStyleBuilder;

        builder.push(`${prefix}subtitle {` + builder.buildSubtitle(this.controls.subtitle ?? {}) + "}");
    }
}

export type ThemeOptions = {
    controls: Controls,
    fonts: Fonts,

    /**
     * Default CSS font family.
     */
    defaultFont?: string,
};