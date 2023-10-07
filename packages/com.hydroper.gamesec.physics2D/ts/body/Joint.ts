import Body from "./Body";

export enum JointType {}

export default class Joint {
    constructor(
        public readonly type: JointType,
        public readonly body1: Body,
        public readonly body2: Body,
    ) {}
}