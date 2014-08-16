var Foxie, Item, SongItem,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Foxie = require('Foxie');

Item = require('../Item');

module.exports = SongItem = (function(_super) {
  __extends(SongItem, _super);

  function SongItem(mainView, parentNode, data) {
    this.mainView = mainView;
    this.parentNode = parentNode;
    SongItem.__super__.constructor.apply(this, arguments);
    this.title1.innerHTML(data.songname);
    this.hammer.on('tap', (function(_this) {
      return function(arg) {
        return _this.mainView.model.musicPlayer.play(data);
      };
    })(this));
  }

  return SongItem;

})(Item);

/*
//@ sourceMappingURL=SongItem.map
*/
