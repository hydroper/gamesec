import { Body, Joint } from "../body";
import { Vector } from "com.hydroper.gamesec.geom2D";

export type SimulationOptions = {
    gravity: Vector,

    /**
     * Timestep length. Defaults to `1 / 60`.
     */
    timestepLength?: number,
};

export default class Simulation {
    /**
     * Global gravity.
     */
    gravity: Vector;

    /**
     * Timestep length during a step.
     */
    timestepLength: number;

    // Contained rigid bodies
    private readonly _bodies: Body[] = [];

    // Joints between rigid bodies
    private readonly _joints: Joint[] = [];

    constructor(options: SimulationOptions) {
        this.gravity = options.gravity;
        this.timestepLength = options.timestepLength === undefined ? 1 / 60 : options.timestepLength;
    }

    step() {
        for (const body of this._bodies) {
            //
        }
    }
}