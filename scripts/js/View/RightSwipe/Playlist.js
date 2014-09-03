var Foxie, MenuItem, Playlist;

Foxie = require('foxie');

MenuItem = require('./MenuItem');

module.exports = Playlist = (function() {
  function Playlist(parentNode) {
    this.parentNode = parentNode;
    this.el = Foxie('.playlist').trans(300).scaleXTo(0).putIn(this.parentNode);
    this.addSong();
    this.addSong();
    this.addSong();
  }

  Playlist.prototype.show = function() {
    return this.el.scaleXTo(1);
  };

  Playlist.prototype.hide = function() {
    return this.el.scaleXTo(0);
  };

  Playlist.prototype.addSong = function() {
    return new MenuItem(this.model, this.el, 'data', ((function(_this) {
      return function() {};
    })(this)), true);
  };

  return Playlist;

})();

/*
//@ sourceMappingURL=Playlist.map
*/
