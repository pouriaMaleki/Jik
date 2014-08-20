var Foxie, SimpleSong;

Foxie = require('Foxie');

module.exports = SimpleSong = (function() {
  function SimpleSong(mainView, parentNode, data) {
    this.mainView = mainView;
    this.parentNode = parentNode;
    this.el = Foxie('.simple-songname').innerHTML(data).moveYTo(100).putIn(this.parentNode);
    this.hammer = new Hammer(this.el.node);
    this.hammer.on('tap', (function(_this) {
      return function() {
        return console.log('hello');
      };
    })(this));
    this.icon = Foxie('.simple-icon').putIn(this.el);
    this.el.putIn(this.parentNode);
  }

  return SimpleSong;

})();

/*
//@ sourceMappingURL=SimpleSong.map
*/
