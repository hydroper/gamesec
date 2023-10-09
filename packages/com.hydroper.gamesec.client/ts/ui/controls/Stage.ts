import { Vector } from "com.hydroper.gamesec.core";
import { Fit } from "../../display2D";
import Control from "./Control";

type StageOptions = {
    /**
     * Stage's fit mode:
     *
     * - `"none"` indicates that no scaling of the stage is done.
     * - `"optimal"` indicates that the stage is scaled to fit the screen
     *   using an optimal scale ratio.
     * - `"all"` indicates that the stage takes all space available in the screen,
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

export default class Stage extends Control {
}