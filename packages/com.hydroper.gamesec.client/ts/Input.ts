import { EventEmitter, clonePlainObject } from "com.hydroper.gamesec.core";
import { InputActionAtom, InputActionKey, InputActionKeyName, navigatorKeyToActualKeyName } from "./InputAction";
import assert from "assert";

/**
 * Mechanism for handling user input actions,
 * including map of input actions and listening
 * to input actions.
 * 
 * # Getting started
 * 
 * The following code demonstrates using arrows and WASD keys
 * for entity movement:
 * 
 * ```
 * import { Input } from "com.hydroper.gamesec.client";
 * 
 * // Set the static input map
 * Input.setMap({
 *     "moveLeft": [
 *         { key: "a" },
 *         { key: "leftArrow" },
 *     ],
 *     "moveRight": [
 *         { key: "d" },
 *         { key: "rightArrow" },
 *     ],
 *     "moveUp": [
 *         { key: "w" },
 *         { key: "upArrow" },
 *     ],
 *     "moveDown": [
 *         { key: "s" },
 *         { key: "downArrow" },
 *     ],
 * });
 * 
 * // When any input is pressed
 * Input.onInputPressed.listen(() => {
 *     // Should move right?
 *     const shouldMoveRight = Input.isPressed("moveRight");
 * });
 * ```
 */
export default class Input {
    /**
     * When the static input map is updated through
     * the static `setMap` method.
     */
    static readonly onMapUpdate = new EventEmitter<void>();

    // Static input map
    private static mMap: Record<string, InputActionAtom[]> = {};

    /**
     * Returns the actual input map in read-only mode.
     */
    static getMap(): Record<string, InputActionAtom[]> {
        return clonePlainObject(Input.mMap, true);
    }

    /**
     * Updates the static input map.
     */
    static setMap(map: Record<string, InputActionAtom[]>) {
        // Update static map
        Input.mMap = clonePlainObject(map, true);

        // Emit update event
        this.onMapUpdate.emit(undefined);
    }

    /**
     * Returns an input map containing user interface actions, in read-only mode.
     * The map will contain the following actions:
     * 
     * * `uiLeft` — Used for focusing the left neighbor of a control.
     * * `uiRight` — Used for focusing the right neighbor of a control.
     * * `uiUp` — Used for focusing the top neighbor of a control.
     * * `uiDown` — Used for focusing the bottom neighbor of a control.
     */
    static defaultUIMap(): Record<string, InputActionAtom[]> {
        return {
            "uiLeft": [ { key: "leftArrow" } ],
            "uiRight": [ { key: "rightArrow" } ],
            "uiUp": [ { key: "upArrow" } ],
            "uiDown": [ { key: "downArrow" } ],
        };
    }

    // Static pressed state pool
    private static readonly mPressedStatePoolKeys: Map<InputActionKeyName, PressedState> = new Map();

    /**
     * When user input starts being pressed or is continuously
     * pressed.
     */
    static readonly onInputPressed = new EventEmitter<void>();

    /**
     * When an input ends being pressed.
     */
    static readonly onInputUp = new EventEmitter<void>();

    static {
        window.addEventListener("keydown", evt => {
            const keyName = navigatorKeyToActualKeyName(evt.key);
            if (keyName !== undefined) {
                // Mutate pressed state
                let state = Input.mPressedStatePoolKeys.get(keyName);
                if (state === undefined) {
                    state = {
                        pressed: false,
                        control: false,
                        shift: false,
                        alt: false,
                    };
                    Input.mPressedStatePoolKeys.set(keyName, state);
                }
                state.pressed = true;
                state.control = evt.ctrlKey;
                state.shift = evt.shiftKey;
                state.alt = evt.altKey;

                // Emit pressed event
                Input.onInputPressed.emit(undefined);
            }
        });

        window.addEventListener("keyup", evt => {
            const keyName = navigatorKeyToActualKeyName(evt.key);
            if (keyName !== undefined) {
                // Mutate pressed state
                let state = Input.mPressedStatePoolKeys.get(keyName);
                if (state === undefined) {
                    state = {
                        pressed: false,
                        control: false,
                        shift: false,
                        alt: false,
                    };
                    Input.mPressedStatePoolKeys.set(keyName, state);
                }
                state.pressed = false;
                state.control = false;
                state.shift = false;
                state.alt = false;

                // Emit input up event
                Input.onInputUp.emit(undefined);
            }
        });
    }

    /**
     * Determines whether an action is pressed.
     * @throws Error Thrown if the action does not exist.
     */
    static isPressed(name: string): boolean {
        const action = Input.mMap[name];
        assert(action !== undefined, "The specified action for Input.isPressed(name) does not exist.");
        for (const item of action!) {
            if (item.hasOwnProperty("key")) {
                const inputActionKey = item as InputActionKey;
                const pressedState = Input.mPressedStatePoolKeys.get(inputActionKey.key);
                return pressedState !== undefined && pressedState.pressed
                    && (inputActionKey.control ? pressedState.control : !pressedState.control)
                    && (inputActionKey.shift ? pressedState.shift : !pressedState.shift)
                    && (inputActionKey.alt ? pressedState.alt : !pressedState.alt);
            }
        }
        return false;
    }
}

type PressedState = {
    pressed: boolean,
    control: boolean,
    shift: boolean,
    alt: boolean,
};