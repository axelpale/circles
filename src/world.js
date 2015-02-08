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
