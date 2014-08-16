var Foxie, MenuItem;

Foxie = require('Foxie');

module.exports = MenuItem = (function() {
  function MenuItem(model, parentNode, data, cb) {
    var elHammer;
    this.model = model;
    this.parentNode = parentNode;
    this.el = Foxie('.menu-item').innerHTML(data).putIn(this.parentNode);
    if (cb != null) {
      elHammer = new Hammer(this.el.node);
      elHammer.on('tap', (function(_this) {
        return function(arg) {
          cb(arg);
          return _this.model.hideRightSwipe();
        };
      })(this));
    }
  }

  return MenuItem;

})();

/*
//@ sourceMappingURL=MenuItem.map
*/
