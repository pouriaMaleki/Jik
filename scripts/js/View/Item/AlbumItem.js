var AlbumItem, Foxie, Item, SimpleSong,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Foxie = require('Foxie');

SimpleSong = require('../SimpleSong');

Item = require('../Item');

module.exports = AlbumItem = (function(_super) {
  __extends(AlbumItem, _super);

  function AlbumItem(mainView, parentNode, page, data, count) {
    var plusHammer, song, _i, _len, _ref;
    this.mainView = mainView;
    this.parentNode = parentNode;
    this.page = page;
    this.count = count;
    AlbumItem.__super__.constructor.apply(this, arguments);
    this.title1.innerHTML(data.album);
    this.title2.innerHTML(data.artist);
    this.plusBtn = Foxie('.album-plus').putIn(this.el);
    plusHammer = new Hammer(this.plusBtn.node);
    plusHammer.on('tap', (function(_this) {
      return function(arg) {
        var song, _i, _len, _ref, _results;
        _this.songs[0].play();
        _ref = _this.songs;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          song = _ref[_i];
          _results.push(song.addToNowPlaying());
        }
        return _results;
      };
    })(this));
    this.hammer.on('tap', (function(_this) {
      return function() {
        _this.mainView.model.albumDetail.toggleDetail(data.id);
      };
    })(this));
    this.mainView.model.albumDetail.on('detail-show', (function(_this) {
      return function(id) {
        if (id !== data.id) {
          return;
        }
        _this.el.setHeight(_this.songs.length * 50 + 75);
        _this.page.updateSize();
        _this.page.scrollToItem(_this.count);
      };
    })(this));
    this.mainView.model.albumDetail.on('detail-close', (function(_this) {
      return function(id) {
        if (id !== data.id) {
          return;
        }
        _this.el.setHeight(75);
        _this.page.updateSize();
      };
    })(this));
    this.songs = [];
    if (data.albumtracks != null) {
      _ref = data.albumtracks;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        song = _ref[_i];
        this.createSong(song);
      }
    }
  }

  AlbumItem.prototype.createSong = function(data) {
    var song;
    song = new SimpleSong(this.mainView, this.el, data);
    return this.songs.push(song);
  };

  return AlbumItem;

})(Item);

/*
//@ sourceMappingURL=AlbumItem.map
*/
