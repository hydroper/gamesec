import assert from "assert";
import { Vector, degreesToRadians, radiansToDegrees } from "com.hydroper.gamesec.core";
import Container from "./Container";
import { DisplayPath } from "./DisplayPath";

/**
 * A 2D display object.
 */
export default abstract class DisplayObject {
    /**
     * Arbitrary data attached to this display object by the
     * developer.
     */
    metaData: any = undefined;

    /**
     * *Internal property.*
     *
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
     * Opacity ratio of the display object. It ranges from
     * 0 to 1 (inclusive).
     */
    opacity: number = 1;

    /**
     * Visibility of the display object.
     */
    visible: boolean = true;

    /**
     * ID of the display object, used by display paths. It is used
     * in the `resolve()` method, for instance.
     */
    id: string | undefined = undefined;

    /**
     * Removes the display object itself from its parent.
     */
    remove() {
        this.mParent?.removeChild(this);
    }

    /**
     * Resolves a display path.
     */
    resolve(path: DisplayPath): DisplayObject | undefined {
        let r: DisplayObject | undefined = this;
        for (const portion of path.split("/")) {
            if (r === undefined) {
                break;
            }
            switch (portion) {
                case "..":
                    r = r.parent;
                    break;
                case ".first":
                    if (r instanceof Container) {
                        r = r.getChildAt(0);
                    } else {
                        r = undefined;
                    }
                    break;
                case ".last":
                    if (r instanceof Container) {
                        r = r.isEmpty ? undefined : r.getChildAt(r.childCount - 1);
                    } else {
                        r = undefined;
                    }
                    break;
                case "":
                case ".":
                    break;
                default:
                    if (r instanceof Container) {
                        r = r.mChildren.find(child => child.id == portion);
                    } else {
                        r = undefined;
                    }
                    break;
            }
        }
        return r;
    }
}