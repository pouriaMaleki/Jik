var Foxie, SubnameSelector, Title;

Foxie = require('foxie');

SubnameSelector = require('./SubnameSelector');

module.exports = Title = (function() {
  function Title(mainView, parentNode, text, width) {
    this.mainView = mainView;
    this.parentNode = parentNode;
    this.width = width;
    this.el = Foxie('.ribbon-title-names').moveXTo(this.width).trans(300);
    this.name = Foxie('.ribbon-title-name').innerHTML(text).putIn(this.el);
    this.selector = new SubnameSelector(this.mainView, this.el);
    this.el.putIn(this.parentNode);
  }

  Title.prototype.getSubnameSelector = function() {
    return this.selector;
  };

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

  Title.prototype.show = function() {
    this.el.moveXTo(0);
    return this.selector.show();
  };

  Title.prototype.nextIam = function() {
    this.el.moveXTo(this.width - this.getWidth() - 50);
    return this.selector.hide();
  };

  Title.prototype.hideToLeft = function() {
    this.el.moveXTo(-200);
    return this.selector.hide();
  };

  Title.prototype.hideToRight = function() {
    this.el.moveXTo(this.width);
    return this.selector.hide();
  };

  return Title;

})();

/*
//@ sourceMappingURL=Title.map
*/
