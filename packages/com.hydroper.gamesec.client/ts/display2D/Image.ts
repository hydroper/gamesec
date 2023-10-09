import DisplayObject from "./DisplayObject";

/**
 * An image display object, either a bitmap or scalable vector graphics (SVG).
 */
export default class Image extends DisplayObject {
    /**
     * @param url The image's source URL.
     */
    constructor(public readonly url: string) {
        super();
    }
}