import { Theme } from "./Theme";

/**
 * Theme based on Microsoft Metro design.
 */
export const metroTheme = new Theme("metro", {
    defaultFont: "'Segoe Ui', 'Open Sans', 'Noto Sans', sans",
    fonts: [],
    controls: {
        application: {
            background: "#fff",
            fontColor: "#0a0a0a",
        },
    },
});