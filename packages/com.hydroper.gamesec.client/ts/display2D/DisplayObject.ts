import assert from "assert";
import { Vector, degreesToRadians, radiansToDegrees } from "com.hydroper.gamesec.core";
import type Container from "./Container";

/**
 * @hidden
 */
export const displayObjectConstructorToken = Symbol();

/**
 * A 2D display object.
 */
export default abstract class DisplayObject {
    constructor(token: Symbol) {
        assert(token === displayObjectConstructorToken, "DisplayObject must not be constructed directly");
    }

    /**
     * Custom data attached to this display object.
     */
    customData: any = undefined;

    /**
     * @hidden
     */
    mParent: Container | undefined = undefined;

    /**
     * Parent display object.
     */
    get parent() {
        return this.mParent;
    }

    /**
     * The position of the display object, using the center as the
     * registration point.
     */
    position: Vector = new Vector(0, 0);

    /**
     * The rotation of the display object in radians, using the center as the
     * registration point.
     */
    rotationRadians: number = 0;

    /**
     * The rotation of the display object in degrees, using the center as the
     * registration point.
     */
    get rotationDegrees() {
        return radiansToDegrees(this.rotationRadians);
    }

    set rotationDegrees(value) {
        this.rotationRadians = degreesToRadians(value);
    }

    /**
     * Non-uniform scale of the display object.
     */
    scale: Vector = new Vector(1, 1);

    /**
     * Opacity ratio of the display object.
     */
    opacity: number = 1;

    /**
     * Visibility of the display object.
     */
    visible: boolean = true;

    /**
     * Name of the display object, used by display object paths.
     */
    name: string | undefined = undefined;

    /**
     * Removes the display object itself from its parent.
     */
    remove() {
        this.mParent?.removeChild(this);
    }
}