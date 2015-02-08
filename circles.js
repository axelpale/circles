!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.circles=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Circle on canvas

var Circle = function (x, y, r, color) {
  // Parameter
  //   x
  //   y
  //   r
  //   color
  //     Any canvas fillStyle
  //     "#ff0000", "red"
  //     https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.fillStyle
  this.x = x;
  this.y = y;
  this.r = r;
  this.color = color;
};

Circle.prototype.moveTo = function (x, y) {
  this.x = x;
  this.y = y;
};

Circle.prototype.moveBy = function (dx, dy) {
  this.x += dx;
  this.y += dy;
};

Circle.prototype.moveToward = function (x, y, distance) {
  var dx = x - this.x;
  var dy = y - this.y;
  var dc = Math.sqrt(dx * dx + dy * dy);
  if (dc !== 0) {
    this.x += distance * dx / dc;
    this.y += distance * dy / dc;
  }
};

Circle.prototype.movePolar = function (distance, angle) {
  this.x += distance * Math.cos(angle);
  this.y -= distance * Math.sin(angle); // minus because inverted coords
};

Circle.prototype.draw = function (ctx) {
  // Parameter
  //   ctx
  //     Canvas drawing context
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
  ctx.fillStyle = this.color;
  ctx.fill();
};

module.exports = Circle;

},{}],2:[function(require,module,exports){
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

},{"./circle":1,"./world":4}],3:[function(require,module,exports){
// Circle group.
// Composite pattern is used.

var Group = function () {
  this.items = [];
};

Group.prototype.add = function (item) {
  // Parameter
  //   item
  //     a group or circle
  this.items.push(item);
}

Group.prototype.draw = function (ctx) {
  // Parameter
  //   ctx
  //     Canvas drawing context
  for (var i = 0; i < this.items.length; i += 1) {
    this.items[i].draw(ctx);
  }
};

module.exports = Group;

},{}],4:[function(require,module,exports){
// canvas background / circle container
var Group = require('./group');

var World = function () {
};

World.prototype = new Group();

World.prototype.draw = function (ctx, w, h) {
  // Parameter
  //   ctx
  //     Canvas drawing context
  //   w
  //     Canvas width
  //   h
  //     Canvas height
  ctx.clearRect(0, 0, w, h);

  Group.prototype.draw.call(this, ctx);
};

module.exports = World;

},{"./group":3}]},{},[2])(2)
});