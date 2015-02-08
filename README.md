# circles.js<sup>v0.2.0</sup>

Circle user interface library targeted for artificial life simulations.



## Install

## Installation

### Browsers

    <script src="scripts/circles.js"></script>

### CommonJS & Node.js

    $ npm install circles
    ---
    > var circles = require('circles');



## API

### circles.createWorld()

Creates canvas element and required styles. The element resizes automatically on window resize.

    var world = circles.createWorld()

### world.createCircle(x, y, r, color)

Position and radius in pixels. Color can be any [canvas fill style](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.fillStyle), e.g. '#ff0000' or 'red'

    var circle = world.createCircle(100, 200, 20, 'red')

### world.searchInside(x, y, r)

Return array of circles inside the specified circle area. Use this for collision detection.

### world.on(event, handler)

Possible events: 'tap'

### world.off(event)

Remove event handler.

### circle.moveTo(x, y)

### circle.moveBy(dx, dy)

### circle.movePolar(distance, angle)

Move circle to the specified direction. Angle in radians.

### circle.moveToward(x, y, distance)

Move circle toward the specified point.

### circle.on(event, handler)

Possible events: 'tap'

### circle.off(event)

Remove event handler.



## Notes for developers

Run tests with `$ npm test`.

Build with `$ npm run build`.

Serve with `$ npm start`. Then see [localhost:8000](http://localhost:8000).



## Todo

- tests



## Versioning

[Semantic Versioning 2.0.0](http://semver.org/)



## License

[MIT License](../blob/master/LICENSE)
