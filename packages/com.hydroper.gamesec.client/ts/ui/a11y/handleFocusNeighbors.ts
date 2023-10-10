import assert from "assert";
import { Input } from "../../input";
import { Control } from "../controls";
import { focusNextElement, focusPrevElement } from "focus-lock";

// Handle focus neighbors
Input.onInputPressed.listen(e => {
    const focusedElement = document.activeElement;
    if (!(focusedElement instanceof HTMLElement)) {
        return;
    }
    const focused = Control.fromNativeElement(focusedElement);
    if (focused === undefined) {
        return;
    }
    // Move left in the user interface
    if (Input.isPressed("uiLeft")) {
        if (focused.focusNeighbors.left !== undefined) {
            const neighbor = focused.resolve(focused.focusNeighbors.left);
            assert(neighbor !== undefined, "A control's 'focusNeighbors.left' resolves to no control");
        } else {
            focusPrevElement(focused.nativeElement);
        }
    }
    // Move right in the user interface
    else if (Input.isPressed("uiRight")) {
        if (focused.focusNeighbors.right !== undefined) {
            const neighbor = focused.resolve(focused.focusNeighbors.right);
            assert(neighbor !== undefined, "A control's 'focusNeighbors.right' resolves to no control");
        } else {
            focusNextElement(focused.nativeElement);
        }
    }
    // Move up in the user interface
    else if (Input.isPressed("uiUp")) {
        if (focused.focusNeighbors.top !== undefined) {
            const neighbor = focused.resolve(focused.focusNeighbors.top);
            assert(neighbor !== undefined, "A control's 'focusNeighbors.top' resolves to no control");
        } else {
            focusPrevElement(focused.nativeElement);
        }
    }
    // Move down in the user interface
    else if (Input.isPressed("uiDown")) {
        if (focused.focusNeighbors.bottom !== undefined) {
            const neighbor = focused.resolve(focused.focusNeighbors.bottom);
            assert(neighbor !== undefined, "A control's 'focusNeighbors.bottom' resolves to no control");
        } else {
            focusNextElement(focused.nativeElement);
        }
    }
});