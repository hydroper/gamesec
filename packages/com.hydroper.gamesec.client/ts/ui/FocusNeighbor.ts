import { ControlPath } from "./ControlPath";

export type FocusNeighbor = {
    /**
     * Path to a left neighbor.
     */
    left?: ControlPath,
    /**
     * Path to a right neighbor.
     */
    right?: ControlPath,
    /**
     * Path to a top neighbor.
     */
    top?: ControlPath,
    /**
     * Path to a bottom neighbor.
     */
    bottom?: ControlPath,
};