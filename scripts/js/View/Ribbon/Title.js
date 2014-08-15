var Foxie, Title;

Foxie = require('foxie');

module.exports = Title = (function() {
  function Title(parentNode, text, width) {
    this.parentNode = parentNode;
    this.width = width;
    this.el = Foxie('.ribbon-title-names').innerHTML(text).moveXTo(this.width).trans(300).putIn(this.parentNode);
  }

  Title.prototype.getWidth = function() {
    if (this.myWidth != null) {
      return this.myWidth;
    }
    return this.myWidth = this.el.node.getBoundingClientRect().width;
  };

  Title.prototype.moveTo = function(x) {
    return this.el.moveXTo(x);
  };

  Title.prototype.update = function(width) {
    this.width = width;
    return this.el.noTrans().moveXTo(this.width).trans(300);
  };

  return Title;

})();

/*
//@ sourceMappingURL=Title.map
*/
