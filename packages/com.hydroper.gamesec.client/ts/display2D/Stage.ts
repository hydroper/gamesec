import { Vector } from "com.hydroper.gamesec.core";
import assert from "assert";
import * as underlying from "./underlying";
import Container from "./Container";
import DisplayObject from "./DisplayObject";
import Image from "./Image";

/**
 * Stage's fit mode.
 * 
 * - `none` indicates no scaling of the stage is done.
 * - `optimal` indicates that the stage is scaled to fit the screen
 *   using an optimal scale ratio.
 * - `all` indicates that the stage takes all space available in the screen,
 *   without additional scaling.
 */
export type Fit = "none" | "optimal" | "all";

export type StageOptions = {
    /**
     * Fit mode. `none`, `optimal` or `all`.
     */
    fit: Fit,

    /**
     * Initial stage size.
     */
    size: Vector,

    /**
     * The container to contain the stage canvas. If it is a string,
     * it is an element selector.
     * Mutually exclusive with the `canvas` option.
     */
    container?: string | HTMLElement,

    /**
     * The stage canvas. If it is a string, it is an element selector.
     * Mutually exclusive with the `container` option.
     */
    canvas?: string | HTMLCanvasElement,

    /**
     * A CSS background color.
     */
    background?: string,
};

/**
 * A 2D display stage.
 */
export default class Stage {
    public readonly root = new Container();

    private mInvalidated = true;
    private mDidInitialRender = false;
    private mFit: Fit;
    private mSize: Vector;
    private mResizeListener: (e: UIEvent) => void;
    private mCanvas: HTMLCanvasElement;
    private mCanvasContext: CanvasRenderingContext2D;

    private mLastResizeSize: Vector = new Vector(0, 0);
    private mLastResizeScale: number = 0;

    constructor(options: StageOptions) {
        this.mFit = options.fit;
        this.mSize = options.size;

        // Resolves the canvas that this stage will use
        const resolveCanvas = () => {
            assert(!(options.container !== undefined && options.canvas !== undefined), "Canvas and container are mutually-exclusive for the Stage.");
            assert(!(options.container === undefined && options.canvas === undefined), "Either a canvas or a container must be specified for the Stage.");

            // When a container is specified
            if (options.container !== undefined) {
                const container = typeof options.container === "string" ? document.querySelector(options.container) : options.container;
                assert(container !== null, "Could not find container for the Stage.");

                const canvas: HTMLCanvasElement = document.createElement("canvas");
                container.appendChild(canvas);
                return canvas;
            // When a canvas is specified
            } else {
                assert(options.canvas !== undefined);

                const canvas: HTMLCanvasElement | null = typeof options.canvas === "string" ? document.querySelector(options.canvas) : options.canvas;
                assert(canvas !== null, "Could not find canvas for the Stage.");

                return canvas!;
            }
        };

        // Resolve canvas
        this.mCanvas = resolveCanvas();
        this.mCanvasContext = this.mCanvas.getContext("2d")!;

        // Set background
        if (options.background !== undefined) {
            this.mCanvas.style.background = options.background;
        }

        // Resize
        this.resize();

        // Set resize listener
        this.mResizeListener = e => { this.resize.bind(this) };
    }

    /**
     * The canvas element used by this stage.
     */
    get canvas(): HTMLCanvasElement {
        return this.mCanvas;
    }

    /**
     * The stage's size.
     */
    get size(): Vector {
        return this.mSize;
    }

    private createRenderer(canvas: HTMLCanvasElement): underlying.Renderer {
        canvas.width = this.mLastResizeSize.x;
        canvas.height = this.mLastResizeSize.y;

        return new underlying.Renderer({
            fullscreen: false,
            fitted: false,
            domElement: canvas,
            type: underlying.q.Types.canvas,
            width: canvas.width,
            height: canvas.height,
        });
    }

    private getScreenSize(): Vector {
        /*
        if (this.mFitTo instanceof HTMLElement) {
            const boundingClientRect = this.mFitTo.getBoundingClientRect();
            return new Vector(boundingClientRect.width, boundingClientRect.height);
        } else {
            return new Vector(this.mFitTo.innerWidth, this.mFitTo.innerHeight);
        }
        */
        if (this.mCanvas.parentElement === null) {
            return new Vector(0, 0);
        }
        const boundingClientRect = this.mCanvas.parentElement.getBoundingClientRect();
        return new Vector(boundingClientRect.width, boundingClientRect.height);
    }

    private resizeRenderer(renderer: underlying.Renderer) {
        renderer.width = this.mLastResizeSize.x;
        renderer.height = this.mLastResizeSize.y;
        renderer.scene.scale = this.mLastResizeScale;
    }

    private resizeCanvas(canvas: HTMLCanvasElement) {
        canvas.width = this.mLastResizeSize.x;
        canvas.height = this.mLastResizeSize.y;
    }

    /**
     * Resize the stage, typically in response to a resize
     * on the window.
     */
    resize() {
        if (this.mInvalidated) {
            return;
        }

        switch (this.mFit) {
            case "none": {
                this.mLastResizeSize = new Vector(this.mSize.x, this.mSize.y);
                this.mLastResizeScale = 1;
                break;
            }
            case "optimal": {
                const screenSize = this.getScreenSize();

                // Take the optimal scale ratio
                const ratios = screenSize.divide(this.mSize);
                const optimalRatio = Math.min(ratios.x, ratios.y);

                this.mLastResizeSize = new Vector(this.mSize.x * optimalRatio, this.mSize.y * optimalRatio);
                this.mLastResizeScale = optimalRatio;
                break;
            }
            case "all": {
                const screenSize = this.getScreenSize();
                this.mSize = screenSize;
                this.mLastResizeSize = screenSize;
                this.mLastResizeScale = 1;
                break;
            }
        }

        this.resizeCanvas(this.mCanvas);

        if (this.mDidInitialRender) {
            this.render();
        }
    }

    /**
     * Attaches the stage itself to the document
     * by by adding its event listeners,
     * and turning the stage valid.
     */
    attachToDocument() {
        if (!this.mInvalidated) {
            return;
        }
        this.mInvalidated = false;
        window.addEventListener("resize", this.mResizeListener);
    }

    /**
     * Detaches the stage itself from the document
     * by removing its canvas element and its event listeners,
     * and invalidating the stage.
     */
    detachFromDocument() {
        if (this.mInvalidated) {
            return;
        }
        this.mInvalidated = true;
        this.mCanvas.remove();
        window.removeEventListener("resize", this.mResizeListener);
    }

    /**
     * Renders the stage.
     */
    render() {
        if (this.mInvalidated) {
            return;
        }
        this.mDidInitialRender = true;
        this.mCanvasContext.clearRect(0, 0, this.mLastResizeSize.x, this.mLastResizeSize.y);

        // Initial parent inherited properties
        const parentInheritedProperties = formParentInheritedProperties({
            position: new Vector(0, 0),
            rotationRadians: 0,
            scale: new Vector(1, 1),
            opacity: 1,
            visible: true,
        }, this.root);

        // Render the stage root to the canvas
        this.mCanvasContext.putImageData(this.renderDisplayObject(this.root, parentInheritedProperties), 0, 0);
    }

    private renderDisplayObject(displayObject: DisplayObject, parentInheritedProperties: ParentInheritedProperties): ImageData {
        // Create subcanvas
        const subcanvas = document.createElement("canvas");
        const subcontext = subcanvas.getContext("2d")!;
        const subrenderer = this.createRenderer(subcanvas);

        // Render children
        if (this instanceof Container) {
            for (const child of this.children) {
                subcontext.putImageData(this.renderDisplayObject(child, formParentInheritedProperties(parentInheritedProperties, child)), 0, 0);
            }
        }

        // Render the `displayObject` variant itself
        this.renderDisplayObjectUnderlying(
            displayObject,
            subrenderer,
            parentInheritedProperties,
        );

        // Apply filters
        this.applyFilters(displayObject, subcontext);

        // Return pixels
        return subcontext.getImageData(0, 0, this.mLastResizeSize.x, this.mLastResizeSize.y);
    }

    private applyFilters(displayObject: DisplayObject, subcontext: CanvasRenderingContext2D) {
        throw new Error("Display object filters are not implemented");
    }

    // Renders the display object as a shape of the underlying renderer,
    // by rendering its variant and applying parent inherited properties to it.
    private renderDisplayObjectUnderlying(
        displayObject: DisplayObject,
        subrenderer: underlying.Renderer,
        parentInheritedProperties: ParentInheritedProperties
    ) {
        // Render the variant
        const shape = this.renderDisplayObjectUnderlyingVariant(displayObject, subrenderer);

        // Finish the display object's underlying shape
        this.finishDisplayObjectUnderlying(subrenderer, shape, parentInheritedProperties);
    }

    // Renders the display object as a shape of the underlying renderer.
    private renderDisplayObjectUnderlyingVariant(
        displayObject: DisplayObject,
        subrenderer: underlying.Renderer,
    ): underlying.Shape {
        if (displayObject instanceof Container) {
            return subrenderer.makeGroup();
        }
        if (displayObject instanceof Image) {
            return subrenderer.makeSprite(displayObject.url, 0, 0);
        }
        throw new Error("Internal non-exhaustive pattern");
    }

    private finishDisplayObjectUnderlying(
        subrenderer: underlying.Renderer,
        shape: underlying.Shape,
        parentInheritedProperties: ParentInheritedProperties,
    ) {
        const group = subrenderer.makeGroup(shape);
        group.position = underlying.vector.from(parentInheritedProperties.position);
        group.rotation = parentInheritedProperties.rotationRadians;
        group.scale = underlying.vector.from(parentInheritedProperties.scale);
        group.opacity = parentInheritedProperties.opacity;
        group.visible = parentInheritedProperties.visible;
    }
}

type ParentInheritedProperties = {
    position: Vector,
    rotationRadians: number,
    scale: Vector,
    opacity: number,
    visible: boolean,
};

function formParentInheritedProperties(previous: ParentInheritedProperties, newParent: DisplayObject): ParentInheritedProperties {
    // Combine `previous` parent inherited properties
    return {
        position: previous.position.add(newParent.position),
        rotationRadians: previous.rotationRadians + newParent.rotationRadians,
        scale: previous.scale.multiply(newParent.scale),
        opacity: previous.opacity * newParent.opacity,
        visible: newParent.visible,
    };
}