import { Shape } from "../shape";
import { CollisionEvent } from "../simulation";
import { EventEmitter, Vector } from "com.hydroper.gamesec.core";

export type BodyJSON = {
    /**
     * Whether it is a dynamic body. Mutually exclusive with
     * the `fixed` property.
     */
    dynamic?: boolean,

    /**
     * Whether it is a fixed body. Mutually exclusive with
     * the `dynamic` property.
     */
    fixed?: boolean,

    /**
     * The body's linear damping coefficient.
     */
    linearDamping?: number,

    /**
     * The body's angular damping coefficient.
     */
    angularDamping?: number,

    /**
     * The body's shape.
     */
    shape: Shape,

    /**
     * The body's restitution. Defaults to zero.
     */
    restitution?: number,

    /**
     * The body's friction. Defaults to zero.
     */
    friction?: number,

    /**
     * The body's moment of inertia. Defaults to zero.
     */
    inertia?: number,

    /**
     * The body's mass. Defaults to zero.
     */
    mass?: number,

    /**
     * Body's rotation in radians.
     */
    rotation?: number,

    /**
     * Body's world-space position.
     */
    position?: Vector,

    /**
     * Body's linear velocity.
     */
    velocity?: Vector,

    /**
     * Body's angular velocity.
     */
    angularVelocity?: number,

    /**
     * Indicates rotatability of the body due to contacts or forces.
     * Defaults to true.
     */
    rotatable?: boolean,
};

/**
 * Rigid body.
 */
export default class Body {
    private _type: "dynamic" | "fixed";

    /**
     * Whether it is a dynamic body. Mutually exclusive with
     * the `fixed` property.
     */
    get dynamic(): boolean {
        return this._type == "dynamic";
    }
    set dynamic(value) {
        this._type = value ? "dynamic" : this._type;
    }

    /**
     * Whether it is a fixed body. Mutually exclusive with
     * the `dynamic` property.
     */
    get fixed(): boolean {
        return this._type == "fixed";
    }
    set fixed(value) {
        this._type = value ? "fixed" : this._type;
    }

    /**
     * Event emitted when two shapes start colliding.
     * Only a body with the non-empty set of `onCollisionStart` listeners
     * emits this event.
     */
    readonly onCollisionStart = new EventEmitter<CollisionEvent>();

    /**
     * Event emitted when two shapes stop colliding.
     * Only a body with the non-empty set of `onCollisionEnd` listeners
     * emits this event.
     */
    readonly onCollisionEnd = new EventEmitter<CollisionEvent>();

    /**
     * The body's linear damping coefficient.
     */
    linearDamping: number;

    /**
     * The body's angular damping coefficient.
     */
    angularDamping: number;

    /**
     * The body's shape.
     */
    readonly shape: Shape;

    /**
     * The body's restitution. Defaults to zero.
     */
    restitution: number;

    /**
     * The body's friction. Defaults to zero.
     */
    friction: number;

    /**
     * The body's moment of inertia. Defaults to zero.
     */
    inertia: number;

    /**
     * The body's mass. Defaults to zero.
     */
    mass: number;

    /**
     * Body's rotation in radians.
     */
    rotation: number;

    /**
     * Body's world-space position.
     */
    position: Vector;

    /**
     * Body's linear velocity.
     */
    velocity: Vector;

    /**
     * Body's angular velocity.
     */
    angularVelocity: number;

    /**
     * Indicates rotatability of the body due to contacts or forces.
     * Defaults to true.
     */
    rotatable: boolean;

    /**
     * 
     * @param id Body's ID.
     */
    constructor(public readonly id: number, json: BodyJSON) {
        this._type = json.fixed ? "fixed" : "dynamic";
        this.linearDamping = json.linearDamping === undefined ? 0 : json.linearDamping;
        this.angularDamping = json.angularDamping === undefined ? 0 : json.angularDamping;
        this.shape = json.shape;
        this.restitution = json.restitution === undefined ? 0 : json.restitution;
        this.friction = json.friction === undefined ? 0 : json.friction;
        this.inertia = json.inertia === undefined ? 0 : json.inertia;
        this.mass = json.mass === undefined ? 0 : json.mass;
        this.rotation = json.rotation === undefined ? 0 : json.rotation;
        this.position = json.position === undefined ? new Vector(0, 0) : json.position;
        this.velocity = json.velocity === undefined ? new Vector(0, 0) : json.velocity;
        this.angularVelocity = json.angularVelocity === undefined ? 0 : json.angularVelocity;
        this.rotatable = json.rotatable === undefined ? true : json.rotatable;
    }
}