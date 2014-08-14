var Foxie, MusicPlayer;

Foxie = require('Foxie');

module.exports = MusicPlayer = (function() {
  function MusicPlayer(mainView) {
    var hideBtnHammer, playHammer;
    this.mainView = mainView;
    this.transTime = 700;
    this.height = window.innerHeight;
    this.showing = false;
    this.el = Foxie('.musicplayer').moveZTo(500).moveYTo(this.height).trans(this.transTime).perspective(4000).putIn(this.mainView.el);
    this.hideBtn = Foxie('.musicplayer-hide').putIn(this.el);
    this.songName = Foxie('.musicplayer-songname').putIn(this.el);
    this.artist = Foxie('.musicplayer-artist').putIn(this.el);
    this.poster = Foxie('img.musicplayer-poster').putIn(this.el);
    this.buttons = Foxie('.musicplayer-buttons').putIn(this.el);
    this.prev = Foxie('.musicplayer-prev').putIn(this.buttons);
    this.play = Foxie('.musicplayer-play').putIn(this.buttons);
    this.next = Foxie('.musicplayer-next').putIn(this.buttons);
    window.addEventListener('resize', (function(_this) {
      return function(event) {
        _this.height = window.innerHeight;
        if (!_this.showing) {
          _this.forceHide();
        }
      };
    })(this));
    playHammer = new Hammer(this.play.node);
    playHammer.on('tap', (function(_this) {
      return function(arg) {
        return _this.mainView.model.musicPlayer.toggle();
      };
    })(this));
    hideBtnHammer = new Hammer(this.hideBtn.node);
    hideBtnHammer.on('tap', (function(_this) {
      return function(arg) {
        return _this.hide();
      };
    })(this));
    this.mainView.model.musicPlayer.on('show-player', (function(_this) {
      return function() {
        _this.show();
      };
    })(this));
    this.mainView.model.musicPlayer.on('play-music', (function(_this) {
      return function(data) {
        _this.show(data);
      };
    })(this));
    this.mainView.model.musicPlayer.on('music-pause', (function(_this) {
      return function() {
        _this.play.node.classList.add('musicplayer-pause');
      };
    })(this));
    this.mainView.model.musicPlayer.on('music-unpause', (function(_this) {
      return function() {
        _this.play.node.classList.remove('musicplayer-pause');
      };
    })(this));
  }

  MusicPlayer.prototype.show = function(data) {
    this.showing = true;
    this.el.moveYTo(0);
    if (data === null) {
      return;
    }
    this.songName.innerHTML(data.songname);
    this.artist.innerHTML(data.artist);
    return this.poster.attr('src', data.poster_big);
  };

  MusicPlayer.prototype.hide = function() {
    this.showing = false;
    return this.el.moveYTo(this.height);
  };

  MusicPlayer.prototype.forceHide = function() {
    this.showing = false;
    return this.el.noTrans().moveYTo(this.height).trans(this.transTime);
  };

  return MusicPlayer;

})();

/*
//@ sourceMappingURL=MusicPlayer.map
*/
