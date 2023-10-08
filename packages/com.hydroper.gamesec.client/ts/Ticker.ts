/**
 * `Ticker` is used for executing code in ticks.
 * 
 * # Examples
 * 
 * ```
 * import * as gamesec from "com.hydroper.gamesec.client";
 * 
 * async function handleFrames() {
 *     const ticker = new gamesec.Ticker({
 *         animation: false,
 *         milliseconds: 30,
 *     });
 *     while (Infinity) {
 *         const delta = await ticker.tick();
 *
 *         // Logic here
 *         yourCode;
 *     }
 * }
 * ```
 */
export class Ticker {
    private start: number;
    private ms: number;
    private lastInstant: number;
    private _tickMethod: (callback: (delta: number) => void) => void;

    constructor(
        {
            animation,
            milliseconds
        }: {
            animation: boolean,
            milliseconds: number
        }
    ) {
        this.start = animation
            ? (document.timeline ? document.timeline.currentTime! as number : performance.now())
            : Date.now();
        this.ms = milliseconds;
        this.lastInstant = this.start;
        this._tickMethod = animation ? this._animationTick.bind(this) : this._nonAnimationTick.bind(this);
    }

    /**
     * Ticks, returning a `Promise` that resolves to
     * delta milliseconds.
     */
    tick(): Promise<number> {
        return new Promise((resolve, _) => {
            this.tickCallback(delta => {
                resolve(delta);
            });
        });
    }

    /**
     * Ticks in a callback given delta milliseconds.
     */
    tickCallback(callback: (delta: number) => void) {
        this._tickMethod(callback);
    }

    _animationTick(callback: (delta: number) => void) {
        const elapsed = this.lastInstant - this.start;
        const roundedElapsed = Math.round(elapsed / this.ms) * this.ms;
        const targetNext = this.start + roundedElapsed + this.ms;
        const delay = targetNext - performance.now();
        const frame = (time: number) => {
            let prevLastInstant = this.lastInstant;
            this.lastInstant = time;
            callback(time - prevLastInstant);
        };
        setTimeout(() => requestAnimationFrame(frame), delay);
    }

    _nonAnimationTick(callback: (delta: number) => void) {
        setTimeout(() => {
            let prevLastInstant = this.lastInstant;
            this.lastInstant = Date.now();
            callback(this.lastInstant - prevLastInstant);
        }, this.ms);
    }
}