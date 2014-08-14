var TitleModel, _Emitter,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_Emitter = require('./_Emitter');

module.exports = TitleModel = (function(_super) {
  __extends(TitleModel, _super);

  function TitleModel() {
    TitleModel.__super__.constructor.apply(this, arguments);
    this.currentActive = 0;
  }

  TitleModel.prototype.activeTitle = function(title) {
    if (title != null) {
      this.currentActive = title;
    }
    return this._emit('page-active', this.currentActive);
  };

  TitleModel.prototype.prevActiveTitle = function() {
    if (this.currentActive > 0) {
      this.currentActive--;
    }
    return this._emit('page-active', this.currentActive);
  };

  TitleModel.prototype.nextActiveTitle = function() {
    if (this.currentActive < 4) {
      this.currentActive++;
    }
    return this._emit('page-active', this.currentActive);
  };

  return TitleModel;

})(_Emitter);

/*
//@ sourceMappingURL=TitleModel.map
*/
