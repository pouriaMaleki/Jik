var Foxie, Lyric, MusicPlayer, Seekbar;

Foxie = require('Foxie');

Lyric = require('./MusicPlayer/Lyric');

Seekbar = require('./MusicPlayer/Seekbar');

module.exports = MusicPlayer = (function() {
  function MusicPlayer(mainView) {
    var elHammer, hideBtnHammer, playHammer, playTopHammer;
    this.mainView = mainView;
    this.transTime = 700;
    this.showing = false;
    this.height = window.innerHeight;
    this.el = Foxie('.musicplayer').moveYTo(this.height).trans(this.transTime).perspective(4000).putIn(this.mainView.el);
    elHammer = new Hammer(this.el.node);
    elHammer.on('panup', (function(_this) {
      return function(arg) {
        if (!_this.showing) {
          return _this.show();
        }
      };
    })(this));
    elHammer.on('pandown', (function(_this) {
      return function(arg) {
        return _this.hide();
      };
    })(this));
    this.playTop = Foxie('.musicplayer-button.musicplayer-playtop').trans(500).putIn(this.el);
    playTopHammer = new Hammer(this.playTop.node);
    playTopHammer.on('tap', (function(_this) {
      return function(arg) {
        if (!_this.showing) {
          return _this.mainView.model.musicPlayer.toggle();
        }
      };
    })(this));
    this.posterTop = Foxie('img.musicplayer-postertop').attr('draggable', 'false').setOpacity(0).trans(500).putIn(this.el);
    this.hideBtn = Foxie('.musicplayer-button.musicplayer-hide').trans(500).putIn(this.el);
    this.songName = Foxie('.musicplayer-songname').putIn(this.el);
    this.artist = Foxie('.musicplayer-artist').putIn(this.el);
    this.posterContainer = Foxie('.musicplayer-poster').putIn(this.el);
    this.poster = Foxie('img').attr('draggable', 'false').putIn(this.posterContainer);
    this.lyric = new Lyric(this.posterContainer, this.mainView.model.musicPlayer);
    this.seekbar = new Seekbar(this.el, this.mainView.model.musicPlayer);
    this.buttons = Foxie('.musicplayer-buttons').putIn(this.el);
    this.prev = Foxie('.musicplayer-button.musicplayer-prev').putIn(this.buttons);
    this.play = Foxie('.musicplayer-button.musicplayer-play').putIn(this.buttons);
    this.next = Foxie('.musicplayer-button.musicplayer-next').putIn(this.buttons);
    window.addEventListener('resize', (function(_this) {
      return function(event) {
        _this.height = window.innerHeight;
        _this.lyric.updateScrollSize();
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
        if (_this.showing) {
          return _this.hide();
        } else {
          if (_this.mainView.model.musicPlayer.playing) {
            return _this.show();
          } else {
            return _this.hide();
          }
        }
      };
    })(this));
    this.mainView.model.musicPlayer.on('show-player', (function(_this) {
      return function() {
        return _this.show();
      };
    })(this));
    this.mainView.model.musicPlayer.on('play-music', (function(_this) {
      return function(data) {
        return _this.show(data);
      };
    })(this));
    this.mainView.model.musicPlayer.on('music-pause', (function(_this) {
      return function() {
        _this.play.node.classList.add('musicplayer-pause');
        _this.playTop.node.classList.add('musicplayer-pausetop');
      };
    })(this));
    this.mainView.model.musicPlayer.on('music-unpause', (function(_this) {
      return function() {
        _this.play.node.classList.remove('musicplayer-pause');
        _this.playTop.node.classList.remove('musicplayer-pausetop');
      };
    })(this));
    this.mainView.model.musicPlayer.on('music-more-detail', (function(_this) {
      return function(data) {
        _this.lyric.text(data.lyric);
        _this.lyric.updateScrollSize();
      };
    })(this));
  }

  MusicPlayer.prototype.show = function(data) {
    if (this.mainView.model.musicPlayer.seeking) {
      return;
    }
    this.showing = true;
    this.el.moveYTo(0);
    this.playTop.setOpacity(0);
    this.posterTop.setOpacity(0);
    this.hideBtn.setOpacity(1);
    if (data == null) {
      return;
    }
    this.songName.innerHTML(data.songname);
    this.artist.innerHTML(data.artist);
    this.poster.attr('src', data.poster_big);
    return this.posterTop.attr('src', data.poster);
  };

  MusicPlayer.prototype.hide = function() {
    if (this.mainView.model.musicPlayer.seeking) {
      return;
    }
    this.showing = false;
    if (this.mainView.model.musicPlayer.playing) {
      this.el.moveYTo(this.height - 50);
    } else {
      this.el.moveYTo(this.height);
    }
    this.playTop.setOpacity(1);
    this.posterTop.setOpacity(1);
    return this.hideBtn.setOpacity(0);
  };

  MusicPlayer.prototype.forceHide = function() {
    this.showing = false;
    if (this.mainView.model.musicPlayer.playing) {
      this.el.noTrans().moveYTo(this.height - 50).trans(this.transTime);
    } else {
      this.el.noTrans().moveYTo(this.height).trans(this.transTime);
    }
    this.playTop.setOpacity(1);
    this.posterTop.setOpacity(1);
    return this.hideBtn.setOpacity(0);
  };

  return MusicPlayer;

})();

/*
//@ sourceMappingURL=MusicPlayer.map
*/
