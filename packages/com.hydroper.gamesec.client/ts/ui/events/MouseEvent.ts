import { Vector } from "com.hydroper.gamesec.core";

export type MouseEvent = {
    /**
     * Relative position of the mouse relative to the control,
     * in pixels.
     */
    offset: Vector,

    /**
     * Position of the mouse relative to the screen,
     * in pixels.
     */
    screenOffset: Vector,
};

export function navigatorMouseEventToThis(e: globalThis.MouseEvent) {
    return {
        offset: new Vector(e.offsetX, e.offsetY),
        screenOffset: new Vector(e.clientX, e.clientY),
    };
}