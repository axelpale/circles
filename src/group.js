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
};

Group.prototype.search = function (x, y, r) {
  // Parameter
  //   x, y
  //
  // Return
  //   array of items colliding with this point
  var result, found, i, j;
  result = [];
  for (i = 0; i < this.items.length; i += 1) {
    found = this.items[i].search(x, y, r);
    if (found !== null) {
      for (j = 0; j < found.length; j += 1) {
        result.push(found[j]);
      }
    }
  }
  return result;
};

Group.prototype.draw = function (ctx) {
  // Parameter
  //   ctx
  //     Canvas drawing context
  for (var i = 0; i < this.items.length; i += 1) {
    this.items[i].draw(ctx);
  }
};

module.exports = Group;
