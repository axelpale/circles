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
