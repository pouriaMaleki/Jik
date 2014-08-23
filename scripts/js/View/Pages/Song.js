var Foxie, Item, Pages, Song,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Foxie = require('foxie');

Item = {
  song: require('../Item/SongItem'),
  video: require('../Item/VideoItem'),
  album: require('../Item/AlbumItem')
};

Pages = require('../Pages');

module.exports = Song = (function(_super) {
  __extends(Song, _super);

  function Song(mainView, parentNode, selector) {
    this.mainView = mainView;
    this.parentNode = parentNode;
    this.selector = selector;
    Song.__super__.constructor.apply(this, arguments);
    this.model = this.mainView.model.song;
    this.selector.setModel(this.model);
    this.selector.create('top');
    this.selector.create('new');
    this.selector.create('featured');
    this.model.on('refresh', (function(_this) {
      return function() {
        _this.removeAll();
        _this.doneRefresh();
      };
    })(this));
    this.model.on('loadmore', (function(_this) {
      return function(itemsData) {
        _this.scroll.release();
        _this.addMultiple(itemsData);
        _this.doneLoad(true);
      };
    })(this));
    this.model.on('load', (function(_this) {
      return function(itemsData) {
        _this.addMultiple(itemsData);
        _this.doneLoad();
      };
    })(this));
  }

  return Song;

})(Pages);

/*
//@ sourceMappingURL=Song.map
*/
