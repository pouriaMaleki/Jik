var Foxie, videoPlayer;

Foxie = require('Foxie');

module.exports = videoPlayer = (function() {
  function videoPlayer(mainView) {
    var elHammer, hideHammer;
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
    this.videoTag = document.createElement('video');
    this.el.node.appendChild(this.videoTag);
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
    this.mainView.model.videoPlayer.on('video-unpause', (function(_this) {
      return function() {
        return _this.videoTag.play();
      };
    })(this));
    this.mainView.model.videoPlayer.on('video-pause', (function(_this) {
      return function(data) {
        return _this.videoTag.pause();
      };
    })(this));
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
  }

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
    return this.artist.innerHTML(data.artist);
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
