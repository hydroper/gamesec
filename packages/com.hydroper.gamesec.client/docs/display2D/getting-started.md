# Getting started

```ts
import * as gamesec from "com.hydroper.gamesec.client";

// Create the stage.
// It is already assumed that the canvas is centered
// by using a `<div/>` container with the CSS properties
// `justify-content: center;` and `align-items: center;`.
const stage = new gamesec.Stage({
    // Fit the stage to the screen using an
    // optimal scale ratio.
    scaleMode: "optimalFit",

    // Scale base for `scaleMode` on which to fit the stage.
    // Either the `window` or a HTML element.
    scaleBase: window,

    // The stage's initial size
    size: new gamesec.Vector(800, 600),

    // A container for the canvas element.
    container: "#myStageContainer",

    // Or you could use an existing canvas element.
    canvas: "#myStageCanvas",

    // Background color
    background: "black",
});

// The stage's canvas element
stage.canvas; // [object HTMLCanvasElement]

// The stage's root display object
stage.root;

// Let's create an image display object.
const image = new gamesec.Image("assets/sun.png");

// Display objects use their center as their registration point
// for positions and rotation.
image.position = new gamesec.Vector(0, 0);

// Rotate a display object using the preferred units:
// degrees or radians
image.rotationDegrees = 45;
image.rotationRadians = gamesec.degreesToRadians(image.rotationDegrees);

// Add a blur filter
image.addFilter(new gamesec.BlurFilter(new Vector(5, 5)));

// Add the image to the stage's root display object
stage.root.addChild(image);

// Render the stage
stage.render();
```

## Containers

```ts
import * as gamesec from "com.hydroper.gamesec.client";

// Create a container
const container = new gamesec.Container([displayObject1, displayObjectN]);

// Add or remove child display objects dynamically
container.addChild(displayObject);
container.removeChild(displayObject);
```

## Detaching from document

```ts
// Invalidates the stage and detaches it from the document.
stage.detachFromDocument();
```