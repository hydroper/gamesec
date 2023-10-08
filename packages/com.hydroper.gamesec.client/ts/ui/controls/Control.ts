/**
 * Abstract class for user interface controls.
 */
export default abstract class Control {
    /**
     * ID for this control, used in control paths.
     */
    id: string | undefined;

    private mParent: Control | undefined = undefined;
    private readonly mChildren: Control[] = [];

    constructor(public readonly nativeElement: HTMLElement) {}

    get parent() {
        return this.mParent;
    }

    get isEmpty(): boolean {
        return this.childCount == 0;
    }

    get nonEmpty(): Boolean {
        return this.childCount != 0;
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
            child.mParent = undefined;
            child.nativeElement.remove();
            return true;
        }
        return false;
    }

    removeChildAt(index: number): boolean {
        if (index >= 0 && index < this.childCount) {
            this.mChildren[index]!.nativeElement.remove();
            this.mChildren.splice(index, 1);
            return true;
        }
        return false;
    }

    removeAllChildren() {
        for (const child of this.mChildren) {
            child.mParent = undefined;
            child.nativeElement.remove();
        }
        this.mChildren.length = 0;
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
}