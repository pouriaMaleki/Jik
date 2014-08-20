var Foxie, Item;

Foxie = require('Foxie');

module.exports = Item = (function() {
  function Item(mainView, parentNode, page, data, count) {
    this.mainView = mainView;
    this.parentNode = parentNode;
    this.page = page;
    this.count = count;
    this.el = Foxie('.item').perspective(4000);
    this.titlesContainer = Foxie('.titles-container').putIn(this.el);
    this.hammer = new Hammer(this.titlesContainer.node);
    this.title1 = Foxie('.item-songname').putIn(this.titlesContainer);
    this.title2 = Foxie('.item-artist').innerHTML(data.artist).putIn(this.titlesContainer);
    this.poster = Foxie('img.item-poster').attr('src', data.poster).putIn(this.titlesContainer);
    this.el.putIn(this.parentNode);
  }

  Item.prototype.hideMe = function() {
    this.el.noTrans().moveXTo(100).setOpacity(0);
    return this;
  };

  Item.prototype.showMe = function(delay) {
    this.el.wait(delay, (function(_this) {
      return function() {
        return _this.el.trans(400).moveXTo(0).setOpacity(1);
      };
    })(this));
    return this;
  };

  Item.prototype.remove = function() {
    return this.parentNode.node.removeChild(this.el.node);
  };

  return Item;

})();

/*
//@ sourceMappingURL=Item.map
*/
