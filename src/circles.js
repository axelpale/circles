var World = require('./world');
var Circle = require('./circle');


// ****************
// Helper functions
// ****************

var makeCanvasAutoFullwindow = function (canvas) {
  // Canvas is resized when window size changes, e.g.
  // when a mobile device is tilted.
  //
  // Parameter
  //   canvas
  //     HTML Canvas element
  //
  var resizeCanvas = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  // resize the canvas to fill browser window dynamically
  window.addEventListener('resize', resizeCanvas, false);
  // Initially resized to fullscreen.
  resizeCanvas();
};



// **********
// Exceptions
// **********
//...



// ***********
// Constructor
// ***********

var Circles = function () {

  // Root element
  var world = new World();

  // To pause animation loop
  var running = true;

  // number, unix timestamp milliseconds of most recent frame.
  var past = null;

  // Everything is drawn on canvas.
  // Styling is required to make canvas window size.
  var canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0px';
  canvas.style.right = '0px';
  canvas.style.display = 'block';
  canvas.style.margin = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  document.body.appendChild(canvas);
  var ctx = canvas.getContext('2d');

  // Make canvas resize automatically to full window area
  makeCanvasAutoFullwindow(canvas);


  var startAnimationLoop = function loopFn() {

    // Time difference from previous frame in milliseconds
    var present, dt;
    present = Date.now();
    dt = (past === null) ? 0 : present - past;
    past = present;

    // Draw; View current model
    world.draw(ctx, canvas.width, canvas.height);

    // Recursion
    // Allow only one viewLoop recursion at a time.
    if (running) {
      window.requestAnimationFrame(loopFn);
    }
  };

  var startAnimation = function () {
    if (!running) {
      running = true;
      startAnimationLoop();
    }
  };

  var stopAnimation = function () {
    running = false;
  };

  if (running) {
    startAnimationLoop();
  }

  // Member functions.
  // Define here instead prototype to keep private variables private.

  this.createCircle = function (x, y, r, color) {
    var c = new Circle(x, y, r, color);
    world.add(c);
    return c;
  };

  this.start = startAnimation;
  this.stop = stopAnimation;

};


exports.create = function (canvas, options) {
  return new Circles(canvas, options);
};



// *************
// Extendability
// *************
// Usage
//   var c = Circles.create(...)
//   Circles.extension.myFunction = function (...) {...}
//   c.myFunction()
exports.extension = Circles.prototype;



// *******
// Version
// *******
exports.version = '0.1.0';
