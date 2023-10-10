import StageContainer from "./StageContainer";
import { ControlPath } from "../ControlPath";
import { FocusNeighbors } from "../FocusNeighbors";
import { EventEmitter } from "com.hydroper.gamesec.core";
import { Theme } from "../themes";
import assert from "assert";

/**
 * An user interface control.
 */
export default abstract class Control {
    // Theme properties
    private mTheme: Theme | undefined = undefined;
    private mAppliedTheme: Theme | undefined = undefined;

    /**
     * The theme assigned to this control. Assigning a theme
     * reference will apply its skins immediately and future
     * added children are affected.
     */
    get theme() {
        return this.mTheme;
    }
    set theme(reference) {
        this.mTheme = reference;
        this.applyTheme();
    }

    /**
     * @hidden
     */
    protected abstract get themeClass(): string;

    /**
     * Applies the assigned or inherited theme to the control and its children
     * so that the stylesheets are up-to-date with the theme.
     */
    private applyTheme() {
        // Inherit theme
        let inherited: Control = this;
        let inheritedTheme: Theme | undefined = undefined;
        while (Infinity) {
            inheritedTheme = inherited.mTheme;
            if (inheritedTheme !== undefined) {
                break;
            }
            assert(inherited.parent !== undefined, "Could not inherit theme as no theme is set.");
            inherited = inherited.parent!;
        }

        this.mAppliedTheme = inheritedTheme!;

        const single = (control: Control) => {
            this.applySingleTheme(control);
            for (const child of control.children) {
                single(child);
            }
        };

        single(this);
    }

    private applySingleTheme(control: Control) {
        control.nativeElement.className = `${this.mAppliedTheme!.prefix.slice(1)}${this.themeClass}`;
    }

    private static readonly mFromNativeElement = new WeakMap<HTMLElement, Control>();

    /**
     * Finds an existing control already constructed earlier
     * given its native element reference.
     */
    static fromNativeElement(element: HTMLElement): Control | undefined {
        return Control.mFromNativeElement.get(element);
    }

    /**
     * ID for this control, used in control paths.
     */
    id: string | undefined;

    /**
     * Indicates neighbors to focus.
     */
    readonly focusNeighbors: FocusNeighbors = {};

    // Parent reference
    private mParent: Control | undefined = undefined;

    // Children controls
    private readonly mChildren: Control[] = [];

    /**
     * Focus event.
     */
    readonly onFocus = new EventEmitter<void>();

    /**
     * Focus in event.
     */
    readonly onFocusIn = new EventEmitter<void>();

    /**
     * Focus out event.
     */
    readonly onFocusOut = new EventEmitter<void>();

    constructor(public readonly nativeElement: HTMLElement) {
        // Native element to the Control itself
        Control.mFromNativeElement.set(nativeElement, this);

        this.nativeElement.addEventListener("focus", e => {
            this.onFocus.emit(undefined);
        });
        this.nativeElement.addEventListener("focusin", e => {
            this.onFocusIn.emit(undefined);
        });
        this.nativeElement.addEventListener("focusout", e => {
            this.onFocusOut.emit(undefined);
        });
    }

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
        this.mChildren.push(child);
        this.nativeElement.appendChild(child.nativeElement);
        this.finishAddedChild(child, this);
    }

    addChildAt(index: number, child: Control) {
        if (this.mChildren.includes(child)) {
            return;
        }
        if (child.mParent !== undefined) {
            child.remove();
        }
        this.mChildren.splice(index, 0, child);
        this.nativeElement.insertBefore(child.nativeElement, this.nativeElement.children[index]);
        this.finishAddedChild(child, this);
    }

    addChildren(children: Control[]) {
        for (const child of children) {
            this.addChild(child);
        }
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

    private finishAddedChild(child: Control, parent: Control) {
        // A stage must be properly attached to the document.
        if (child instanceof StageContainer) {
            child.stage.attachToDocument();
        }
        child.mParent = parent;
        if (this.mAppliedTheme !== undefined) {
            this.applySingleTheme(child);
        }
    }

    private finishRemovedChild(child: Control) {
        // A stage must be properly detached from the document.
        if (child instanceof StageContainer) {
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