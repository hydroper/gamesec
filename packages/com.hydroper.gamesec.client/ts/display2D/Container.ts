import DisplayObject, { displayObjectConstructorToken } from "./DisplayObject";

export default class Container extends DisplayObject {
    private readonly mChildren: DisplayObject[] = [];

    constructor() {
        super(displayObjectConstructorToken);
    }

    get isEmpty(): boolean {
        return this.childCount == 0;
    }

    get nonEmpty(): Boolean {
        return this.childCount != 0;
    }

    get children(): IterableIterator<DisplayObject> {
        return this.mChildren[Symbol.iterator]();
    }

    get childCount() {
        return this.mChildren.length;
    }

    getChildAt(index: number): DisplayObject | undefined {
        return index >= 0 && index < this.childCount ? this.mChildren[index] : undefined;
    }

    getChildIndex(child: DisplayObject): number | undefined {
        const i = this.mChildren.indexOf(child);
        return i === -1 ? undefined : i;
    }

    addChild(child: DisplayObject) {
        if (this.mChildren.includes(child)) {
            return;
        }
        if (child.mParent !== undefined) {
            child.remove();
            child.mParent = undefined;
        }
        child.mParent = this;
        this.mChildren.push(child);
    }

    addChildAt(index: number, child: DisplayObject) {
        if (this.mChildren.includes(child)) {
            return;
        }
        if (child.mParent !== undefined) {
            child.remove();
            child.mParent = undefined;
        }
        child.mParent = this;
        this.mChildren.splice(index, 0, child);
    }

    removeChild(child: DisplayObject): boolean {
        const i = this.mChildren.indexOf(child);
        if (i !== -1) {
            this.mChildren.splice(i, 1);
            child.mParent = undefined;
            return true;
        }
        return false;
    }

    removeChildAt(index: number): boolean {
        if (index >= 0 && index < this.childCount) {
            this.mChildren.splice(index, 1);
            return true;
        }
        return false;
    }

    removeAllChildren() {
        for (const child of this.mChildren) {
            child.mParent = undefined;
        }
        this.mChildren.length = 0;
    }

    /**
     * Swaps the position of two children.
     */
    swapChildren(childA: DisplayObject, childB: DisplayObject) {
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
}