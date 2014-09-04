var MusicPlayerModel, _Emitter,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_Emitter = require('./_Emitter');

module.exports = MusicPlayerModel = (function(_super) {
  __extends(MusicPlayerModel, _super);

  function MusicPlayerModel(rootModel) {
    this.rootModel = rootModel;
    MusicPlayerModel.__super__.constructor.apply(this, arguments);
    this.playing = false;
    this.lyricsShowing = false;
    this.playingData = {};
    this.seeking = false;
    this.audioTag = document.createElement('audio');
    document.body.appendChild(this.audioTag);
    this.audioTag.addEventListener('timeupdate', (function(_this) {
      return function(event) {
        return _this._emit('seeker-update', _this.audioTag.currentTime / _this.audioTag.duration);
      };
    })(this));
    this.audioTag.addEventListener('progress', (function(_this) {
      return function(event) {
        try {
          return _this._emit('buffer-update', _this.audioTag.buffered.end(_this.audioTag.buffered.length - 1) / _this.audioTag.duration);
        } catch (_error) {}
      };
    })(this));
  }

  MusicPlayerModel.prototype.seekTo = function(x) {
    return this.audioTag.currentTime = x * this.audioTag.duration;
  };

  MusicPlayerModel.prototype.fav = function() {
    var song;
    song = this.rootModel.playlists.fav.find(this.playingData.id);
    if (song !== false) {
      this.rootModel.playlists.fav.removeSong(this.playingData);
      return this._emit('song-unfav', true);
    } else {
      this.rootModel.playlists.fav.addSong(this.playingData);
      return this._emit('song-fav', true);
    }
  };

  MusicPlayerModel.prototype.play = function(data) {
    var song;
    this._emit('play-music', data);
    this.rootModel.videoPlayer.pause();
    if (data.id === this.playingData.id) {
      return;
    }
    if (this.playing) {
      this.audioTag.pause();
    }
    if (this.rootModel.settings.quality) {
      this.audioTag.src = data.mp3;
    } else {
      this.audioTag.src = data.mp3_low;
    }
    song = this.rootModel.playlists.fav.find(data.id);
    if (song !== false) {
      this._emit('song-fav', true);
    } else {
      this._emit('song-unfav', true);
    }
    this.audioTag.play();
    this.playing = true;
    this.playingData = data;
    return this.getMoreDetail(data.id);
  };

  MusicPlayerModel.prototype.pause = function() {
    if (this.playing) {
      this.audioTag.pause();
      this._emit('music-pause');
    }
    return this.playing = false;
  };

  MusicPlayerModel.prototype.toggle = function() {
    if (this.playing) {
      this.audioTag.pause();
      this._emit('music-pause');
    } else {
      this.audioTag.play();
      this._emit('music-unpause');
    }
    return this.playing = !this.playing;
  };

  MusicPlayerModel.prototype.getMoreDetail = function(id) {
    return setTimeout((function(_this) {
      return function() {
        var json;
        json = '{"lyric":"<p>\u0639\u0634\u0642 \u0627\u062d\u0633\u0627\u0633\u0647 \u0646\u0647 \u0645\u0639\u0627\u062f\u0644\u0647<\/p><p>\u0628\u062e\u0648\u0627\u06cc \u062d\u0644\u0634 \u06a9\u0646\u06cc \u0645\u06cc\u0634\u0647 \u0645\u0628\u0627\u062f\u0644\u0647<\/p><p>\u0627\u06cc\u0646 \u0645\u0628\u0627\u062f\u0644\u0647 \u0645\u06cc\u0634\u0647 \u0645\u062c\u0627\u062f\u0644\u0647<\/p><p>\u0647\u06cc\u0634\u06a9\u06cc \u0647\u06cc\u0686\u06cc \u0646\u06af\u0647<\/p><p>\u062d\u06a9\u0645 \u0627\u06cc\u0646\u062c\u0627 \u062f\u0644\u0647<\/p><p>\u0627\u062d\u0633\u0627\u0633\u0647 \u062d\u0633\u0647 \u0644\u0645\u0633\u0647 \u062f\u0633\u062a\u0647 \u06af\u0644\u06cc \u06a9\u0647 \u0628\u0647\u0645 \u062f\u0627\u062f\u06cc<\/p><p>\u0627\u062d\u0633\u0627\u0633\u0647 \u062d\u0633\u0647 \u0644\u0645\u0633\u0647 \u062f\u0633\u062a\u0647 \u06af\u0644\u06cc \u06a9\u0647 \u0628\u0647\u0645 \u062f\u0627\u062f\u06cc<\/p><p>\u0627\u062d\u0633\u0627\u0633\u0647 \u062d\u0633\u0647 \u0644\u0645\u0633\u0647 \u062f\u0633\u062a\u0647 \u06af\u0644\u06cc \u06a9\u0647 \u0628\u0647\u0645 \u062f\u0627\u062f\u06cc<\/p><p>\u0627\u062d\u0633\u0627\u0633\u0647 \u062d\u0633\u0647 \u0644\u0645\u0633\u0647 \u062f\u0633\u062a\u0647 \u06af\u0644\u06cc \u06a9\u0647 \u0628\u0647\u0645 \u062f\u0627\u062f\u06cc<\/p><p>\u0627\u06cc \u062f\u0644 \u0645\u0646 \u062f\u0627\u0631\u0647 \u0628\u0627 \u062f\u0644\u062a \u0628\u06cc \u062f\u0644\u0647<\/p><p>\u0628\u06cc \u0647\u0648\u0627 \u0628\u06cc \u062d\u0648\u0627\u0633 \u0628\u06cc \u062f\u0644\u06cc\u0644 \u0628\u06cc \u062f\u0644\u0647<\/p><p>\u0627\u0648\u0646 \u06a9\u0647 \u0645\u06cc\u0644\u0631\u0632\u0647 \u0648\u0627\u0633\u062a \u062d\u0633\u0627\u0628\u06cc \u062f\u0644\u0647<\/p><p>\u0647\u06cc \u062f\u0644\u0647 \u0645\u0646 \u062f\u0627\u0631\u0647 \u0628\u0627 \u062f\u0644\u062a \u0645\u06cc \u062f\u0644\u0647<\/p><p>\u0647\u06cc \u0647\u06cc \u0647\u06cc \u0631\u0648\u0627\u0646\u06cc \u062a\u0648 \u0639\u0634\u0642 \u0645\u0646\u06cc<\/p><p>\u0647\u06cc \u0631\u0648\u0627\u0646\u06cc \u06a9\u0647 \u0647\u06cc \u0642\u0648\u0644\u062a\u0648 \u0645\u06cc\u0634\u06a9\u0646\u06cc<\/p><p>\u062f\u0631\u062f\u0633\u0631 \u0633\u0627\u0632\u0647 \u0644\u062c\u0628\u0627\u0632\u0647 \u062f\u0648\u0633\u062a \u062f\u0627\u0634\u062a\u0646\u06cc<\/p><p>\u0647\u06cc \u0631\u0648\u0627\u0646\u06cc \u062a\u0648 \u0639\u0634\u0642 \u0645\u0646\u06cc<\/p><p>\u0639\u0634\u0642 \u062a\u062d\u06a9\u06cc\u0645\u0647 \u0646\u0647 \u0645\u062d\u0627\u06a9\u0645\u0647<\/p><p>\u0646\u0647 \u0645\u062d\u06a9\u0648\u0645 \u06a9\u0633\u06cc \u0646\u0647 \u0647\u06cc\u0634\u06a9\u06cc \u062d\u0627\u06a9\u0645\u0647<\/p><p>\u0639\u0634\u0642 \u062a\u0642\u062f\u06cc\u0645\u0647 \u0646\u0647 \u0645\u0628\u0627\u062f\u0644\u0647<\/p><p>\u062e\u0637 \u0645\u0645\u062a\u062f\u0650 \u0646\u0647 \u062e\u0637 \u0641\u0627\u0635\u0644\u0647<\/p><p>\u062d\u0633\u0627\u0633\u0647 \u0648\u0627\u0633\u0647 \u062d\u0633\u0647 \u0645\u062b\u0647 \u062f\u0644\u06cc \u06a9\u0647 \u0628\u0647\u0645 \u062f\u0627\u062f\u06cc<\/p><p>\u062d\u0633\u0627\u0633\u0647 \u0648\u0627\u0633\u0647 \u062d\u0633\u0647 \u0645\u062b\u0647 \u062f\u0644\u06cc \u06a9\u0647 \u0628\u0647\u0645 \u062f\u0627\u062f\u06cc<\/p><p>\u062d\u0633\u0627\u0633\u0647 \u0648\u0627\u0633\u0647 \u062d\u0633\u0647 \u0645\u062b\u0647 \u062f\u0644\u06cc \u06a9\u0647 \u0628\u0647\u0645 \u062f\u0627\u062f\u06cc<\/p><p>\u0627\u06cc \u062f\u0644 \u0645\u0646 \u062f\u0627\u0631\u0647 \u0628\u0627 \u062f\u0644\u062a \u0628\u06cc \u062f\u0644\u0647<\/p><p>\u0628\u06cc \u0647\u0648\u0627 \u0628\u06cc \u062d\u0648\u0627\u0633 \u0628\u06cc \u062f\u0644\u06cc\u0644 \u0628\u06cc \u062f\u0644\u0647<\/p><p>\u0627\u0648\u0646 \u06a9\u0647 \u0645\u06cc\u0644\u0631\u0632\u0647 \u0648\u0627\u0633\u062a \u062d\u0633\u0627\u0628\u06cc \u062f\u0644\u0647<\/p><p>\u0647\u06cc \u062f\u0644\u0647 \u0645\u0646 \u062f\u0627\u0631\u0647 \u0628\u0627 \u062f\u0644\u062a \u0645\u06cc \u062f\u0644\u0647<\/p><p>\u0647\u06cc \u0647\u06cc \u0647\u06cc \u0631\u0648\u0627\u0646\u06cc \u062a\u0648 \u0639\u0634\u0642 \u0645\u0646\u06cc<\/p><p>\u0647\u06cc \u0631\u0648\u0627\u0646\u06cc \u06a9\u0647 \u0647\u06cc \u0642\u0648\u0644\u062a\u0648 \u0645\u06cc\u0634\u06a9\u0646\u06cc<\/p><p>\u062f\u0631\u062f\u0633\u0631 \u0633\u0627\u0632\u0647 \u0644\u062c\u0628\u0627\u0632\u0647 \u062f\u0648\u0633\u062a \u062f\u0627\u0634\u062a\u0646\u06cc<\/p><p>\u0647\u06cc \u0647\u06cc \u0647\u06cc \u0631\u0648\u0627\u0646\u06cc \u062a\u0648 \u0639\u0634\u0642 \u0645\u0646\u06cc<\/p>","info":{"albumcount":"18","dlcount":"24300","view":"56038","descrip":"","tags":"\u067e\u0627\u067e ,","lyrics":"\u0641\u0631\u0634\u06cc\u062f \u0633\u0645\u0627","composer":"\u0628\u0646\u06cc\u0627\u0645\u06cc\u0646 \u0628\u0647\u0627\u062f\u0631\u06cc ","arrangement":"\u0641\u0631\u0634\u06cc\u062f \u0633\u0645\u0627 "},"summary":{"size":"7MB","dateadded":"2014-04-20","format":"mp3","permission":null},"song":[{"id":"133928","type":"song","artist":"\u0628\u0646\u06cc\u0627\u0645\u06cc\u0646 \u0628\u0647\u0627\u062f\u0631\u06cc","artist_id":"71","songname":"\u0639\u0634\u0642 \u0627\u062d\u0633\u0627\u0633\u0647","popularity":"4.4","ratecount":"127","view":"56038","time":"3:8","date":"1393-01-31","poster":"http:\/\/85.25.243.154\/img\/5pkjehomg-1397985962.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/B\/Benyamin\/Gallery\/[Medium]\/qpvfehss-1397985962.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Benyamin\/-\/Eshgh+Ehsaseh","mp3":"http:\/\/85.25.95.231\/music\/B\/Benyamin\/[one]\/Eshgh Ehsaseh [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/B\/Benyamin\/[one]\/Eshgh Ehsaseh [WikiSeda].mp3"}]}';
        return _this._emit('music-more-detail', JSON.parse(json));
      };
    })(this), 2500);
  };

  MusicPlayerModel.prototype.toggleLyrics = function() {
    if (this.lyricsShowing) {
      this._emit('lyrics-hide');
      return this.lyricsShowing = false;
    } else {
      this._emit('lyrics-show');
      return this.lyricsShowing = true;
    }
  };

  return MusicPlayerModel;

})(_Emitter);

/*
//@ sourceMappingURL=MusicPlayerModel.map
*/
