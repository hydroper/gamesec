import { Vector } from "com.hydroper.gamesec.core";
import { Container, Fit, Stage as StageStage } from "../../display2D";
import Control from "./Control";

type StageOptions = {
    /**
     * Stage's fit mode:
     *
     * - `none` indicates that no scaling of the stage is done.
     * - `optimal` indicates that the stage is scaled to fit the screen
     *   using an optimal scale ratio.
     * - `all` indicates that the stage takes all space available in the screen,
     *   without additional scaling.
     */
    fit: Fit,

    /**
     * Initial stage size.
     */
    size: Vector,

    /**
     * A CSS background color.
     */
    background?: string,
};

/**
 * Control used for embedding a 2D stage into the user interface.
 * 
 * # Examples
 * 
 * ```
 * import * as gamesec from "com.hydroper.gamesec.client";
 * 
 * // Create a stage
 * const stage = new gamesec.ui.Stage({
 *     fit: "optimal",
 *     size: new gamesec.Vector(700, 570),
 *     background: "#000",
 * });
 * 
 * // Stage's stage
 * stage.stage;
 * ```
 */
export default class Stage extends Control {
    /**
     * Stage's stage.
     */
    readonly stage: StageStage;

    readonly focusable: boolean = false;

    constructor(options: StageOptions) {
        super(document.createElement("canvas"));
        this.stage = new StageStage({
            fit: options.fit,
            size: options.size,
            background: options.background,

            canvas: this.nativeElement as HTMLCanvasElement,
        });
    }
}