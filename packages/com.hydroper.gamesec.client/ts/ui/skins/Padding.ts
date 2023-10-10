import { Points } from "./Points";
import { Vector } from "com.hydroper.gamesec.core";

export type Padding = Points | Vector | {
    left?: Points,
    right?: Points,
    top?: Points,
    bottom?: Points,
};