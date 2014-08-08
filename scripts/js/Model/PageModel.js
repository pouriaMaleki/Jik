var PageModel, _Emitter,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_Emitter = require('./_Emitter');

module.exports = PageModel = (function(_super) {
  __extends(PageModel, _super);

  function PageModel() {
    PageModel.__super__.constructor.apply(this, arguments);
    this.currentActive = 0;
  }

  PageModel.prototype.activeTitle = function(title) {
    this.currentActive = title;
    return this._emit('page-active', this.currentActive);
  };

  PageModel.prototype.prevActiveTitle = function() {
    if (this.currentActive > 0) {
      this.currentActive--;
    }
    return this._emit('page-active', this.currentActive);
  };

  PageModel.prototype.nextActiveTitle = function() {
    if (this.currentActive < 4) {
      this.currentActive++;
    }
    return this._emit('page-active', this.currentActive);
  };

  return PageModel;

})(_Emitter);

/*
//@ sourceMappingURL=PageModel.map
*/
