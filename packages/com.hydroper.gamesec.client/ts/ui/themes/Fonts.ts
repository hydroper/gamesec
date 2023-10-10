export type Fonts = ThemeFont[];

/**
 * Specifies a font for a theme.
 */
export type ThemeFont = {
    /**
     * The font family.
     */
    font: string,

    /**
     * The weight of the specified resource.
     */
    weight?: string,

    /**
     * Specifies the resource containing the font data.
     * It is equivalent to CSS `src` descriptor for the `@font-face`
     * rule ([reference](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/src)).
     */
    source: string | string[],
};