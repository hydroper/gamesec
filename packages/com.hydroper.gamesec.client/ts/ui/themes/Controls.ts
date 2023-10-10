import { CSSValue, Margin, Padding, Points, RectangleSkin, Transition } from "../skins";

export type Controls = {
    application?: Application,
    button?: {
        primary?: Button,
        secondary?: Button,
        danger?: Button,
    },
    label?: Label,
    headingTitle?: HeadingTitle,
    subtitle?: Subtitle,
    paragraph?: Paragraph,
};

export type Application = FontSkin & {
    background?: CSSValue,
};

export type Button = FontSkin & {
    transitions?: Transition[],
    padding?: Padding,
    margin?: Margin,
    normal?: ButtonState,
    disabled?: ButtonState,
    hovered?: ButtonState,
    pressed?: ButtonState,
    focused?: ButtonState,
};

export type ButtonState = RectangleSkin & FontSkin;

export type Label = LabelState & {
    align?: "left" | "center" | "right",

    selectable?: boolean,
    selected?: LabelState,
};

export type LabelState = FontSkin & {
    background?: CSSValue,
};

export type HeadingTitle = {
    heading1?: HeadingTitleTitle,
    heading2?: HeadingTitleTitle,
    heading3?: HeadingTitleTitle,
    heading4?: HeadingTitleTitle,
};

export type HeadingTitleTitle = FontSkin & {
    margin?: Margin,
};

export type Subtitle = FontSkin & {
    margin?: Margin,
};

export type Paragraph = ParagraphState & {
    margin?: Margin,
    selectable?: boolean,
    selected?: ParagraphState,
};

export type ParagraphState = FontSkin & {
    background?: CSSValue,
};

export type FontSkin = {
    /**
     * A CSS font family.
     */
    font?: string,

    fontColor?: CSSValue,
    fontSize?: Points,

    italicFont?: boolean,
    boldFont?: boolean,
    lightFont?: boolean,

    upperCase?: boolean,
    lowerCase?: boolean,
};