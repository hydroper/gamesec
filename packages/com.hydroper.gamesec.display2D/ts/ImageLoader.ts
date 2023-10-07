import { EventEmitter } from "com.hydroper.gamesec.core";
import ImageLoaderProgressEvent from "./ImageLoaderProgressEvent";

/**
 * Use `ImageLoader` to preload a set of images by URL.
 * 
 * # Syntax
 * 
 * ```
 * import * as gamesec from "com.hydroper.gamesec.client";
 * 
 * // Create an ImageLoader
 * const imageLoader = new gamesec.ImageLoader([
 *     url1,
 *     urlN,
 * ]);
 * 
 * // Whether it is currently loaded or not
 * imageLoader.loaded;
 * 
 * // When the ImageLoader is done loading all its URLs
 * imageLoader.onLoad.listen(() => {
 *     //
 * });
 * 
 * // When progress is done
 * imageLoader.onProgress.listen(e => {
 *     e.count; // Count of loaded URLs
 *     e.total; // Total URLs
 *     e.percent; // Percent of loaded URLs
 * });
 * ```
 */
export default class ImageLoader {
    /**
     * When the `ImageLoader` is done loading its URLs.
     */
    readonly onLoad = new EventEmitter<void>();

    /**
     * When the `ImageLoader` is done loading a single URL.
     */
    readonly onProgress = new EventEmitter<ImageLoaderProgressEvent>();

    private mLoaded = false;

    constructor(public readonly urls: string[]) {
        let i = 0;
        const n = urls.length;
        for (const url of urls) {
            const img = document.createElement("img");
            img.src = url;
            img.onload = e => {
                i += 1;
                if (i >= n) {
                    this.onLoad.emit(undefined);
                    this.onProgress.emit({
                        count: i,
                        percent: (i / n) * 100,
                        total: n,
                    });
                    this.mLoaded = true;
                }
            };
        }
    }

    /**
     * Whether all the URLs are loaded.
     */
    get loaded(): boolean {
        return this.mLoaded;
    }
}