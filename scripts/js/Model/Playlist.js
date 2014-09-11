var Playlist, _Emitter,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_Emitter = require('./_Emitter');

module.exports = Playlist = (function(_super) {
  __extends(Playlist, _super);

  function Playlist(model, name, data) {
    this.model = model;
    this.name = name;
    this.data = data;
    this.addSongToEnd = __bind(this.addSongToEnd, this);
    this.addSong = __bind(this.addSong, this);
    Playlist.__super__.constructor.apply(this, arguments);
  }

  Playlist.prototype.getSongs = function() {
    var song, _i, _len, _ref, _results;
    _ref = this.data;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      song = _ref[_i];
      _results.push(this._emit('add-song', song));
    }
    return _results;
  };

  Playlist.prototype.addSong = function(song) {
    if (this.find(song.id) !== false) {
      return;
    }
    this.data.push(song);
    this._emit('add-song', song);
    return this._emit('add-success', song);
  };

  Playlist.prototype.addSongToEnd = function(song) {
    if (this.find(song.id) !== false) {
      this.removeSong(song);
    }
    this.data.push(song);
    this._emit('add-song', song);
    return this._emit('add-success', song);
  };

  Playlist.prototype.removeSong = function(song) {
    var index, result, s, _i, _len, _ref;
    result = null;
    _ref = this.data;
    for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
      s = _ref[index];
      if (s.id === song.id) {
        result = index;
        break;
      }
    }
    this.data.splice(result, 1);
    return this._emit('remove-song', song);
  };

  Playlist.prototype.find = function(id) {
    var song, _i, _len, _ref;
    _ref = this.data;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      song = _ref[_i];
      if (song.id === id) {
        return song;
      }
    }
    return false;
  };

  return Playlist;

})(_Emitter);

/*
//@ sourceMappingURL=Playlist.map
*/
