var Foxie, SimpleSong;

Foxie = require('Foxie');

module.exports = SimpleSong = (function() {
  function SimpleSong(mainView, parentNode, page, data) {
    this.mainView = mainView;
    this.parentNode = parentNode;
    this.page = page;
    this.el = Foxie('.item').perspective(4000);
    this.hammer = new Hammer(this.el.node);
    this.title1 = Foxie('.item-songname').putIn(this.el);
    this.title2 = Foxie('.item-artist').innerHTML(data.artist).putIn(this.el);
    this.el.putIn(this.parentNode);
  }

  return SimpleSong;

})();

/*
//@ sourceMappingURL=SimpleSong.map
*/
