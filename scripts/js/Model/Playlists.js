var Playlists, _Emitter,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_Emitter = require('./_Emitter');

module.exports = Playlists = (function(_super) {
  __extends(Playlists, _super);

  function Playlists(model) {
    this.model = model;
    Playlists.__super__.constructor.apply(this, arguments);
    console.log('playlists');
  }

  return Playlists;

})(_Emitter);

/*
//@ sourceMappingURL=Playlists.map
*/
