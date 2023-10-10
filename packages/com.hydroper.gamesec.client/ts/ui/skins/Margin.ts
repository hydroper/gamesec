import { Vector } from "com.hydroper.gamesec.core";
import { Points } from "./Points";

export type Margin = Points | Vector | {
    left?: Points,
    right?: Points,
    top?: Points,
    bottom?: Points,
};