/**
 * Two-dimensional vector.
 */
export default class Vector {
    private readonly mNonStructural?: void;

    constructor(
        public readonly x: number,
        public readonly y: number
    ) {}

    equals(other: Vector) {
        return this.x == other.x && this.y == other.y;
    }

    clone() {
        return new Vector(this.x, this.y);
    }

    add(other: Vector) {
        return new Vector(this.x + other.x, this.y + other.y);
    }

    subtract(other: Vector) {
        return new Vector(this.x - other.x, this.y - other.y);
    }

    multiply(other: Vector) {
        return new Vector(this.x * other.x, this.y * other.y);
    }

    divide(other: Vector) {
        return new Vector(this.x / other.x, this.y / other.y);
    }

    dotProduct(v: Vector) {
        const u = this;
        return u.x * v.x + u.y * v.y;
    }
}