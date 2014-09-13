var AlbumDetail, _Emitter,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_Emitter = require('./_Emitter');

module.exports = AlbumDetail = (function(_super) {
  __extends(AlbumDetail, _super);

  function AlbumDetail(model) {
    this.model = model;
    AlbumDetail.__super__.constructor.apply(this, arguments);
    this.detail = false;
  }

  AlbumDetail.prototype.toggleDetail = function(id) {
    var temp;
    if (this.detail) {
      this._emit('detail-close', this.detail);
      temp = this.detail;
      this.detail = false;
    }
    if (id == null) {
      return;
    }
    if (id === temp) {
      return;
    }
    this.detail = id;
    return this._emit('detail-show', id);
  };

  return AlbumDetail;

})(_Emitter);

/*
//@ sourceMappingURL=AlbumDetail.map
*/
