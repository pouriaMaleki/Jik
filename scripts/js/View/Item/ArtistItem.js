var ArtistItem, Foxie, Item,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Foxie = require('Foxie');

Item = require('../Item');

module.exports = ArtistItem = (function(_super) {
  __extends(ArtistItem, _super);

  function ArtistItem(mainView, parentNode, page, data) {
    this.mainView = mainView;
    this.parentNode = parentNode;
    this.page = page;
    ArtistItem.__super__.constructor.apply(this, arguments);
    this.title1.innerHTML(data.artist);
    this.updateFans(data);
    this.poster.attr('src', data.thumb);
    this.hammer.on('tap', (function(_this) {
      return function(arg) {
        return _this.mainView.model.artist.selectArtist(data);
      };
    })(this));
    this.mainView.model.artist.on('follow-change', (function(_this) {
      return function(artist) {
        if (artist.id !== data.id) {
          return;
        }
        return _this.updateFans(artist);
      };
    })(this));
  }

  ArtistItem.prototype.updateFans = function(data) {
    var t2;
    t2 = data.fans + ' fan';
    if (data.following === 1) {
      t2 = t2 + ' plus you';
    }
    return this.title2.innerHTML(t2);
  };

  return ArtistItem;

})(Item);

/*
//@ sourceMappingURL=ArtistItem.map
*/
