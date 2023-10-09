import Stage from "./Stage";
import { ControlPath } from "../ControlPath";
import { FocusNeighbors } from "../FocusNeighbors";

/**
 * An user interface control.
 */
export default abstract class Control {
    /**
     * ID for this control, used in control paths.
     */
    id: string | undefined;

    /**
     * Indicates neighbors to focus.
     */
    readonly focusNeighbors: FocusNeighbors = {};

    private mParent: Control | undefined = undefined;
    private readonly mChildren: Control[] = [];

    constructor(public readonly nativeElement: HTMLElement) {}

    /**
     * Indicates whether the control is focusable.
     */
    abstract get focusable(): boolean;
    abstract set focusable(value);

    /**
     * Focus a focusable control.
     */
    focus(options: {
        preventScroll?: boolean,
    } = {}) {
        if (this.focusable) {
            this.nativeElement.focus({
                preventScroll: options.preventScroll,
            });
        }
    }

    get parent() {
        return this.mParent;
    }
    get children(): IterableIterator<Control> {
        return this.mChildren[Symbol.iterator]();
    }

    get childCount() {
        return this.mChildren.length;
    }

    getChildAt(index: number): Control | undefined {
        return index >= 0 && index < this.childCount ? this.mChildren[index] : undefined;
    }

    getChildIndex(child: Control): number | undefined {
        const i = this.mChildren.indexOf(child);
        return i === -1 ? undefined : i;
    }

    addChild(child: Control) {
        if (this.mChildren.includes(child)) {
            return;
        }
        if (child.mParent !== undefined) {
            child.remove();
            child.mParent = undefined;
        }
        child.mParent = this;
        this.mChildren.push(child);
        this.nativeElement.appendChild(child.nativeElement);
    }

    addChildAt(index: number, child: Control) {
        if (this.mChildren.includes(child)) {
            return;
        }
        if (child.mParent !== undefined) {
            child.remove();
            child.mParent = undefined;
        }
        child.mParent = this;
        this.mChildren.splice(index, 0, child);
        this.nativeElement.insertBefore(child.nativeElement, this.nativeElement.children[index]);
    }

    /**
     * Removes the control itself from the parent.
     */
    remove() {
        this.parent?.removeChild(this);
    }

    removeChild(child: Control): boolean {
        const i = this.mChildren.indexOf(child);
        if (i !== -1) {
            this.mChildren.splice(i, 1);
            this.finishRemovedChild(child);
            return true;
        }
        return false;
    }

    removeChildAt(index: number): boolean {
        if (index >= 0 && index < this.childCount) {
            this.finishRemovedChild(this.mChildren[index]);
            this.mChildren.splice(index, 1);
            return true;
        }
        return false;
    }

    removeAllChildren() {
        for (const child of this.mChildren) {
            this.finishRemovedChild(child);
        }
        this.mChildren.length = 0;
    }

    private finishRemovedChild(child: Control) {
        // A stage must be properly detached from the document.
        if (child instanceof Stage) {
            child.stage.detachFromDocument();
        }
        child.nativeElement.remove();
        child.mParent = undefined;
    }

    /**
     * Swaps the position of two children.
     */
    swapChildren(childA: Control, childB: Control) {
        const childAIndex = this.getChildIndex(childA);
        const childBIndex = this.getChildIndex(childB);
        if (childAIndex === undefined || childBIndex === undefined) {
            return;
        }
        childA.remove();
        childB.remove();
        this.addChildAt(childAIndex, childB);
        this.addChildAt(childBIndex, childA);
    }

    /**
     * Resolves a control path.
     */
    resolve(path: ControlPath): Control | undefined {
        let r: Control | undefined = this;
        for (const portion of path.split("/")) {
            if (r === undefined) {
                break;
            }
            switch (portion) {
                case "..":
                    r = r.parent;
                    break;
                case ".first":
                    r = r.getChildAt(0);
                    break;
                case ".last":
                    r = r.childCount == 0 ? undefined : r.getChildAt(r.childCount - 1);
                    break;
                case "":
                case ".":
                    break;
                default:
                    r = r.mChildren.find(child => child.id == portion);
                    break;
            }
        }
        return r;
    }
}