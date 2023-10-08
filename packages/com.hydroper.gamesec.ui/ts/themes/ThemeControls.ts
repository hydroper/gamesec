import { CSSValue, Padding, RectangleSkin, Transition } from "../skins";

export type ThemeControls = {
    button: ThemeButton,
    label: ThemeLabel,
};

export type ThemeButton = {
    transitions?: Transition[],
    padding: Padding,
    normal: ThemeButtonState,
    disabled?: ThemeButtonState,
    hovered?: ThemeButtonState,
    pressed?: ThemeButtonState,
    focused?: ThemeButtonState,
};

export type ThemeButtonState = RectangleSkin & {
    textColor: CSSValue,
};

export type ThemeLabel = ThemeLabelState & {
    textAlign?: "left" | "center" | "right",

    selectable?: boolean,
    selected?: ThemeLabelState,
};

export type ThemeLabelState = {
    background?: CSSValue,
    textColor?: CSSValue,
};