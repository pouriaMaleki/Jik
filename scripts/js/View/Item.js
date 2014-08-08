var Foxie, Item, Pantomime;

Foxie = require('Foxie');

Pantomime = require('pantomime');

module.exports = Item = (function() {
  function Item(mainView, parentNode, data) {
    var hammer;
    this.mainView = mainView;
    this.parentNode = parentNode;
    this.el = Foxie('.item').perspective(4000).moveZTo(100).putIn(this.parentNode);
    hammer = new Hammer(this.el.node);
    hammer.on('tap', (function(_this) {
      return function(arg) {
        return _this.mainView.model.musicPlayer.play(data);
      };
    })(this));
    this.title1 = Foxie('.item-songname').putIn(this.el);
    this.title2 = Foxie('.item-artist').innerHTML(data.artist).putIn(this.el);
    this.poster = Foxie('img.item-poster').attr('src', data.poster).putIn(this.el);
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

  return Item;

})();

/*
//@ sourceMappingURL=Item.map
*/
