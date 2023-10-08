import { CSSValue, Padding, RectangleSkin, Transition } from "../skins";

export type ThemeControls = {
    button?: ThemeButton,
    label?: ThemeLabel,
};

export type ThemeButton = {
    /**
     * A CSS font family.
     */
    font?: string,

    transitions?: Transition[],
    padding: Padding,
    normal: ThemeButtonState,
    disabled?: ThemeButtonState,
    hovered?: ThemeButtonState,
    pressed?: ThemeButtonState,
    focused?: ThemeButtonState,
};

export type ThemeButtonState = RectangleSkin & {
    fontColor: CSSValue,
};

export type ThemeLabel = ThemeLabelState & {
    align?: "left" | "center" | "right",

    /**
     * A CSS font family.
     */
    font?: string,

    italic?: boolean,
    bold?: boolean,
    light?: boolean,
    extraLight?: boolean,

    selectable?: boolean,
    selected?: ThemeLabelState,
};

export type ThemeLabelState = {
    background?: CSSValue,
    fontColor?: CSSValue,
};