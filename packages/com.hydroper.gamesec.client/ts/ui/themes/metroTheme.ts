import { Theme } from "./Theme";

/**
 * Theme based on Microsoft Metro design.
 */
export const metroTheme = createMetroTheme();

function createMetroTheme() {
    return new Theme("metro", {
        defaultFont: "'Segoe Ui', 'Open Sans', 'Noto Sans', sans",
        fonts: [],
        controls: {
            application: {
                background: "#222",
                fontColor: "#fff",
            },
        },
    });
}