# com.hydroper.gamesec.physics2D

Two-dimensional physics simulation for TypeScript.

## Getting started

```ts
import * as gamesec from "com.hydroper.gamesec.core";

// Create a simulation
const simulation = new gamesec.Simulation({
    gravity: new gamesec.Vector(0, 0),
});

// Create a rigid body
const body = simulation.addRigidBody({
    type: "dynamic",
    shape: {
        type: "rectangle",
        width: 100,
        height: 100,
    },
});

body.id; // Body's ID

// Step simulation forward
simulation.step();
```

## To do

<blockquote>

x(t) = Body location at time t
v(t) = Body velocity at time t
Y(t) = System state at time t

</blockquote>

- Body
  - [x] ID
  - [x] Mutually-exclusive properties: `dynamic`, `fixed`
  - [x] Linear and angular damping
  - [x] Shape
  - [x] Restitution, friction, inertia, mass, rotation (radians), position
  - [x] Linear and angular velocity
  - [x] Rotatable
  - [x] `onCollisionStart` and `onCollisionEnd`
  - [ ] `centerOfMass`
  - [ ] `addForce`
  - [ ] `addForceAt`
  - [ ] `applyTorque`
- [x] Shape
- [ ] Joints
- [ ] Simulation
  - [ ] ID management
  - [ ] `addRigidBody`
  - [ ] `getRigidBody`
  - [ ] `rigidBodies`
  - [ ] `removeRigidBody`
  - [ ] `addJoint`
  - [ ] `joints`
  - [ ] `removeJoint`
  - [ ] `step`
    - SAT collision
      - https://www.npmjs.com/package/sat
      - [ ] Emit collision events for rigid bodies with non-empty listeners set of these events
    - Runge-Kutta: https://en.wikipedia.org/wiki/Runge–Kutta_methods
      - https://www.npmjs.com/package/runge-kutta