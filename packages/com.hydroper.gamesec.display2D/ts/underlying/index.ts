import Renderer from 'two.js';
import { Shape } from 'two.js/src/shape';
import { Rectangle } from 'two.js/src/shapes/rectangle';
import { Vector } from 'two.js/src/vector';
import { Vector as OuterVector } from 'com.hydroper.gamesec.core';

// The underlying renderer as a qualifier
const q = Renderer as any;

const vector = {
    // Converts outer vector to underlying renderer's vector.
    from(vector: OuterVector): Vector {
        return new Vector(vector.x, vector.y);
    },
};

export {
    /**
     * @hidden
     */
    Renderer,

    /**
     * @hidden
     */
    Shape,

    /**
     * @hidden
     */
    Rectangle,

    /**
     * @hidden
     */
    Vector,

    /**
     * @hidden
     */
    q,

    /**
     * @hidden
     */
    vector,
};