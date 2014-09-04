var Foxie, MenuItem;

Foxie = require('Foxie');

module.exports = MenuItem = (function() {
  function MenuItem(model, parentNode, data, cb, stay) {
    var elHammer;
    this.model = model;
    this.parentNode = parentNode;
    if (stay == null) {
      stay = false;
    }
    this.el = Foxie('.menu-item').innerHTML(data).putIn(this.parentNode);
    if (cb != null) {
      elHammer = new Hammer(this.el.node);
      elHammer.on('tap', (function(_this) {
        return function(arg) {
          cb(arg, _this);
          if (stay === false) {
            return _this.model.hideRightSwipe();
          }
        };
      })(this));
    }
  }

  MenuItem.prototype.updateText = function(text) {
    return this.el.innerHTML(text);
  };

  MenuItem.prototype.removeMe = function() {
    return this.el.remove();
  };

  return MenuItem;

})();

/*
//@ sourceMappingURL=MenuItem.map
*/
