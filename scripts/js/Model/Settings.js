var Settings, _Emitter,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_Emitter = require('./_Emitter');

module.exports = Settings = (function(_super) {
  __extends(Settings, _super);

  function Settings(model) {
    this.model = model;
    Settings.__super__.constructor.apply(this, arguments);
    this.quality = localStorage.getItem('quality');
    if (this.quality === 'false') {
      this.quality = false;
    } else if (this.quality === 'true') {
      this.quality = true;
    } else {
      this.quality = true;
    }
  }

  Settings.prototype.changeQuality = function(quality) {
    this.quality = quality;
    return localStorage.setItem('quality', this.quality);
  };

  Settings.prototype.switchQuality = function() {
    this.changeQuality(!this.quality);
    return this._emit('quality', this.quality);
  };

  return Settings;

})(_Emitter);

/*
//@ sourceMappingURL=Settings.map
*/
