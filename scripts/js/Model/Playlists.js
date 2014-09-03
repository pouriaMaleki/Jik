var Playlists, _Emitter,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_Emitter = require('./_Emitter');

module.exports = Playlists = (function(_super) {
  __extends(Playlists, _super);

  function Playlists(model) {
    this.model = model;
    this.createNewPlaylist = __bind(this.createNewPlaylist, this);
    Playlists.__super__.constructor.apply(this, arguments);
  }

  Playlists.prototype.readPlaylists = function() {
    this._emit('playlist-add', {
      text: 'Now Playing'
    });
    this._emit('playlist-add', {
      text: 'Favorites'
    });
    return this._emit('playlist-add', {
      text: 'Default'
    });
  };

  Playlists.prototype.createNewPlaylist = function(name) {
    return console.log(name);
  };

  return Playlists;

})(_Emitter);

/*
//@ sourceMappingURL=Playlists.map
*/
