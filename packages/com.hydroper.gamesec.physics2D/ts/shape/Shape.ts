import { Vector } from "com.hydroper.gamesec.core";

export type ShapeJSON =
    (
        // Rectangle turns into a polygon
        | {
            type: "rectangle",
            width: number,
            height: number,
        }
        // Circle
        | {
            type: "circle",
            radius: number,
        }
        // Polygon
        | {
            type: "polygon",
            vertices: Vector[],
        }
    )
    & {
        position?: Vector,
    };

/**
 * Geometric shape used by a `Body`. It is either a
 * polygon or circle.
 */
export default class Shape {
    private _isCircle: boolean;

    // Define radius for polygon
    public _vertices: Vector[];

    // Define radius for circle
    private _radius: number = 0;

    readonly position: Vector;

    constructor(json: ShapeJSON) {
        this.position = json.position ?? new Vector(0, 0);
        switch (json.type) {
            case "rectangle":
                this._isCircle = false;
                this._vertices = [
                    new Vector(0, 0),
                    new Vector(json.width, 0),
                    new Vector(json.width, json.height),
                    new Vector(0, json.height),
                ];
                break;
            case "circle":
                this._isCircle = true;
                this._vertices = [];
                this._radius = json.radius;
                break;
            case "polygon":
                this._isCircle = false;
                this._vertices = json.vertices.slice(0);
                break;
        }
    }

    /**
     * Returns the vertices of a polygon `Shape`.
     * 
     * > **Note:** This property always returns the same `Array`.
     */
    get vertices(): Vector[] {
        return this._vertices;
    }

    /**
     * Returns the radius of a circle `Shape`.
     */
    get radius(): number {
        return this._radius;
    }
}