var PagesModel, _Emitter,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_Emitter = require('./_Emitter');

module.exports = PagesModel = (function(_super) {
  __extends(PagesModel, _super);

  function PagesModel(model) {
    this.model = model;
    PagesModel.__super__.constructor.apply(this, arguments);
    setTimeout((function(_this) {
      return function() {
        return _this._emit('option', _this.option);
      };
    })(this), 500);
  }

  PagesModel.prototype.get = function() {};

  PagesModel.prototype.refresh = function() {};

  PagesModel.prototype.loadMore = function() {};

  PagesModel.prototype.setOption = function(option) {
    this.option = option;
    return this._emit('option', this.option);
  };

  return PagesModel;

})(_Emitter);

/*
//@ sourceMappingURL=PagesModel.map
*/
