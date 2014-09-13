var Foxie, SimpleSong;

Foxie = require('Foxie');

module.exports = SimpleSong = (function() {
  function SimpleSong(mainView, parentNode, data) {
    this.mainView = mainView;
    this.parentNode = parentNode;
    this.data = data;
    this.el = Foxie('.simple-songname').innerHTML(this.data.songname).moveYTo(100).putIn(this.parentNode);
    this.hammer = new Hammer(this.el.node);
    this.hammer.on('tap', (function(_this) {
      return function() {
        return _this.play();
      };
    })(this));
    this.icon = Foxie('.simple-icon').putIn(this.el);
    this.el.putIn(this.parentNode);
  }

  SimpleSong.prototype.play = function() {
    return this.mainView.model.musicPlayer.play(this.data);
  };

  SimpleSong.prototype.addToNowPlaying = function() {
    return this.mainView.model.musicPlayer.addToNowPlaying(this.data);
  };

  return SimpleSong;

})();

/*
//@ sourceMappingURL=SimpleSong.map
*/
