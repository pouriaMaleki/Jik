var AlbumModel, PagesModel,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

PagesModel = require('../PagesModel');

module.exports = AlbumModel = (function(_super) {
  __extends(AlbumModel, _super);

  function AlbumModel(model) {
    this.model = model;
    AlbumModel.__super__.constructor.apply(this, arguments);
    this.option = 0;
  }

  AlbumModel.prototype.get = function() {};

  AlbumModel.prototype.refresh = function() {
    this._emit('refresh');
    return this.get();
  };

  AlbumModel.prototype.setOption = function(option) {
    this.option = option;
    this._emit('option', this.option);
    return this.refresh();
  };

  return AlbumModel;

})(PagesModel);

/*
//@ sourceMappingURL=AlbumModel.map
*/
