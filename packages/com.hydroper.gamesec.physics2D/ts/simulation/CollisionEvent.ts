import { Body } from "../body";

/**
 * Collision between two bodies, either a start or end.
 */
export default class CollisionEvent {
    /**
     * @param base Base body involved in the collision.
     * @param other The other body involved in the collision.
     */
    constructor(
        public readonly base: Body,
        public readonly other: Body
    ) {}
}