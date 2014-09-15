var Foxie, MenuItem, Playlist;

Foxie = require('foxie');

MenuItem = require('./MenuItem');

module.exports = Playlist = (function() {
  function Playlist(parentNode, mainView, model) {
    this.parentNode = parentNode;
    this.mainView = mainView;
    this.model = model;
    this.items = {};
    this.el = Foxie('.playlist').trans(300).scaleXTo(0).putIn(this.parentNode);
    this.model.on('add-song', (function(_this) {
      return function(song) {
        return _this.addSong(song);
      };
    })(this));
    this.model.on('remove-song', (function(_this) {
      return function(song) {
        return _this.removeSong(song);
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
    var item;
    item = new MenuItem(this.mainView.model.page, this.el, song.songname, (function(_this) {
      return function() {
        var data, _i, _len, _ref, _results;
        _this.mainView.model.musicPlayer.play(song);
        _ref = _this.model.data;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          data = _ref[_i];
          _results.push(_this.mainView.model.musicPlayer.addToNowPlaying(data));
        }
        return _results;
      };
    })(this));
    return this.items[song.id] = item;
  };

  Playlist.prototype.removeSong = function(song) {
    var item;
    if (this.items[song.id] == null) {
      return;
    }
    item = this.items[song.id];
    item.removeMe();
    return this.items[song.id] = void 0;
  };

  return Playlist;

})();

/*
//@ sourceMappingURL=Playlist.map
*/
