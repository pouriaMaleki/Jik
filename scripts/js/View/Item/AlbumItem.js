var AlbumItem, Foxie, Item,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Foxie = require('Foxie');

Item = require('../Item');

module.exports = AlbumItem = (function(_super) {
  __extends(AlbumItem, _super);

  function AlbumItem(mainView, parentNode, data) {
    this.mainView = mainView;
    this.parentNode = parentNode;
    AlbumItem.__super__.constructor.apply(this, arguments);
    this.title1.innerHTML(data.album);
  }

  return AlbumItem;

})(Item);

/*
//@ sourceMappingURL=AlbumItem.map
*/
