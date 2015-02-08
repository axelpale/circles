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
