/**
 * A 3x3 matrix.
 */
export default class Matrix {
    private readonly mNonStructural?: void;

    constructor(
        public readonly a: number,
        public readonly b: number,
        public readonly c: number,
        public readonly d: number,
        public readonly tx: number,
        public readonly ty: number
    ) {}

    clone() {
        return new Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty);
    }
}