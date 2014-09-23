var Foxie, Seekbar, videoPlayer,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Foxie = require('Foxie');

Seekbar = require('./musicPlayer/Seekbar');

module.exports = videoPlayer = (function() {
  function videoPlayer(mainView) {
    var elHammer, hideHammer;
    this.mainView = mainView;
    this.pause = __bind(this.pause, this);
    this.play = __bind(this.play, this);
    this.transTime = 700;
    this.showing = false;
    this.height = window.innerHeight;
    this.el = Foxie('.musicplayer').moveYTo(this.height).trans(this.transTime).putIn(document.body);
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
    elHammer.on('tap', (function(_this) {
      return function(arg) {
        return _this.mainView.model.videoPlayer.toggle();
      };
    })(this));
    this.hideBtn = Foxie('.musicplayer-button.musicplayer-hide').trans(500).putIn(this.el);
    hideHammer = new Hammer(this.hideBtn.node);
    hideHammer.on('tap', (function(_this) {
      return function(arg) {
        return _this.hide();
      };
    })(this));
    this.songName = Foxie('.musicplayer-songname').putIn(this.el);
    this.artist = Foxie('.musicplayer-artist').putIn(this.el);
    this.playPauseBtn = Foxie('.videoplayer-playpause').putIn(this.el);
    this.videoTag = document.createElement('video');
    this.el.node.appendChild(this.videoTag);
    this.videoTag.addEventListener('seeked', (function(_this) {
      return function(event) {
        return _this.model.seekerUpdate(_this.videoTag.currentTime / _this.videoTag.duration);
      };
    })(this));
    this.videoTag.addEventListener('progress', (function(_this) {
      return function(event) {
        try {
          return _this.model.bufferUpdate(_this.videoTag.buffered.end(_this.videoTag.buffered.length - 1) / _this.audioTag.duration);
        } catch (_error) {}
      };
    })(this));
    this.mainView.model.videoPlayer.on('show-player', (function(_this) {
      return function() {
        return _this.show();
      };
    })(this));
    this.mainView.model.videoPlayer.on('play-video', (function(_this) {
      return function(data) {
        _this.show(data);
        return _this.videoTag.play();
      };
    })(this));
    this.mainView.model.videoPlayer.on('video-unpause', this.play);
    this.mainView.model.videoPlayer.on('video-pause', this.pause);
    window.addEventListener('resize', (function(_this) {
      return function(event) {
        _this.height = window.innerHeight;
        if (!_this.showing) {
          _this.forceHide();
        }
        if (_this.showing) {
          return _this.portscape();
        }
      };
    })(this));
    this.seekbar = new Seekbar(this.el, this.mainView.model.videoPlayer);
  }

  videoPlayer.prototype.play = function() {
    this.videoTag.play();
    this.playPauseBtn.node.classList.remove('videoplayer-resume');
    this.playPauseBtn.setOpacity(.3);
    return setTimeout((function(_this) {
      return function() {
        return _this.playPauseBtn.setOpacity(0);
      };
    })(this), 2000);
  };

  videoPlayer.prototype.pause = function() {
    this.videoTag.pause();
    this.playPauseBtn.node.classList.add('videoplayer-resume');
    return this.playPauseBtn.setOpacity(1);
  };

  videoPlayer.prototype.show = function(data) {
    if (this.mainView.model.videoPlayer.seeking) {
      return;
    }
    this.portscape();
    this.showing = true;
    this.el.moveYTo(0);
    if (data == null) {
      return;
    }
    if (this.mainView.model.settings.quality) {
      this.videoTag.src = data.highq;
    } else {
      this.videoTag.src = data.lowq;
    }
    this.songName.innerHTML(data.videoname);
    this.artist.innerHTML(data.artist);
    return this.play();
  };

  videoPlayer.prototype.hide = function() {
    if (this.mainView.model.videoPlayer.seeking) {
      return;
    }
    this.showing = false;
    this.el.moveYTo(this.height);
    return this.mainView.model.videoPlayer.pause();
  };

  videoPlayer.prototype.forceHide = function() {
    this.showing = false;
    this.el.noTrans().moveYTo(this.height).trans(this.transTime);
    return this.mainView.model.videoPlayer.pause();
  };

  videoPlayer.prototype.portscape = function() {
    if (window.innerHeight > window.innerWidth) {
      this.hideBtn.setOpacity(1);
      this.songName.setOpacity(1);
      return this.artist.setOpacity(1);
    } else {
      this.hideBtn.setOpacity(0);
      this.songName.setOpacity(0);
      return this.artist.setOpacity(0);
    }
  };

  return videoPlayer;

})();

/*
//@ sourceMappingURL=VideoPlayer.map
*/
