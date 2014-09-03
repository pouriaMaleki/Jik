var Foxie, MenuItem, Playlist;

Foxie = require('foxie');

MenuItem = require('./MenuItem');

module.exports = Playlist = (function() {
  function Playlist(parentNode, mainView, model) {
    this.parentNode = parentNode;
    this.mainView = mainView;
    this.model = model;
    this.el = Foxie('.playlist').trans(300).scaleXTo(0).putIn(this.parentNode);
    this.model.on('add-song', (function(_this) {
      return function(song) {
        return _this.addSong(song);
      };
    })(this));
    this.model.getSongs();
  }

  Playlist.prototype.show = function() {
    return this.el.scaleXTo(1);
  };

  Playlist.prototype.hide = function() {
    return this.el.scaleXTo(0);
  };

  Playlist.prototype.addSong = function(song) {
    return new MenuItem(this.mainView.model.page, this.el, song.songname, (function(_this) {
      return function() {
        return _this.mainView.model.musicPlayer.play(song);
      };
    })(this));
  };

  return Playlist;

})();

/*
//@ sourceMappingURL=Playlist.map
*/
