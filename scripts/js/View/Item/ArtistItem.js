var AlbumItem, Foxie, Item, SimpleSong,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Foxie = require('Foxie');

SimpleSong = require('../SimpleSong');

Item = require('../Item');

module.exports = AlbumItem = (function(_super) {
  __extends(AlbumItem, _super);

  function AlbumItem(mainView, parentNode, page, data, count) {
    this.mainView = mainView;
    this.parentNode = parentNode;
    this.page = page;
    this.count = count;
    AlbumItem.__super__.constructor.apply(this, arguments);
    Foxie('.album-icon').putIn(this.titlesContainer);
    this.detailNotLoaded = Foxie('.simple-songname').innerHTML('Loading Album').moveYTo(85).putIn(this.el);
    this.detailsLoaded = false;
    this.title1.innerHTML(data.album);
    this.hammer.on('tap', (function(_this) {
      return function() {
        if (_this.detailsLoaded === false) {
          _this.mainView.model.albumDetail.loadDetail(data.id);
        }
        _this.mainView.model.albumDetail.toggleDetail(data.id);
      };
    })(this));
    this.mainView.model.albumDetail.on('details', (function(_this) {
      return function(albumDetail) {
        var song, _i, _len, _ref;
        if (albumDetail.id !== data.id) {
          return;
        }
        _this.detailsLoaded = true;
        _this.el.node.removeChild(_this.detailNotLoaded.node);
        _ref = albumDetail.songs;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          song = _ref[_i];
          _this.createSong(song);
        }
        if (_this.mainView.model.albumDetail.detail === data.id) {
          _this.el.setHeight(_this.songs.length * 50 + 75);
          _this.page.updateSize();
        }
      };
    })(this));
    this.mainView.model.albumDetail.on('detail-show', (function(_this) {
      return function(id) {
        if (id !== data.id) {
          return;
        }
        if (_this.detailsLoaded === false) {
          _this.el.setHeight(120);
        } else {
          _this.el.setHeight(_this.songs.length * 50 + 75);
        }
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
  }

  return AlbumItem;

})(Item);

/*
//@ sourceMappingURL=ArtistItem.map
*/
