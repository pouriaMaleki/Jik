var Foxie, MenuItem, Playlist, Scrolla;

Foxie = require('Foxie');

MenuItem = require('./RightSwipe/MenuItem');

Scrolla = require('./Scrolla');

module.exports = Playlist = (function() {
  function Playlist(mainView) {
    var btnHammer, elHammer, y;
    this.mainView = mainView;
    this.model = this.mainView.model.page;
    this.items = [];
    this.btn = Foxie('.playlist-btn').putIn(this.mainView.el);
    this.width = window.innerWidth;
    this.el = Foxie('.playlist').moveXTo(this.width).trans(300).putIn(this.mainView.el);
    btnHammer = new Hammer(this.btn.node);
    btnHammer.on('tap', (function(_this) {
      return function(arg) {
        return _this.model.togglePlaylists();
      };
    })(this));
    elHammer = new Hammer(this.el.node);
    elHammer.on('panright', (function(_this) {
      return function(arg) {
        return _this.model.hidePlaylists();
      };
    })(this));
    this.mainView.model.page.on('playlists', (function(_this) {
      return function(flag) {
        if (flag) {
          return _this.show();
        } else {
          return _this.hide();
        }
      };
    })(this));
    this.newItem('Home', (function(_this) {
      return function() {
        return _this.model.activeTitle(0);
      };
    })(this));
    this.newItem('Artist', (function(_this) {
      return function() {
        return _this.model.activeTitle(1);
      };
    })(this));
    this.newItem('Album', (function(_this) {
      return function() {
        return _this.model.activeTitle(2);
      };
    })(this));
    this.newItem('Song', (function(_this) {
      return function() {
        return _this.model.activeTitle(3);
      };
    })(this));
    this.newItem('Video', (function(_this) {
      return function() {
        return _this.model.activeTitle(4);
      };
    })(this));
    this.newItem('</br>');
    this.newItem('Settings', (function(_this) {
      return function() {
        return _this.model.showSettings();
      };
    })(this));
    this.scroll = new Scrolla({
      maxStretch: 500
    });
    this.updateScrollSize();
    y = 0;
    elHammer.on('panup pandown', (function(_this) {
      return function(arg) {
        _this.scroll.drag(arg.deltaY - y);
        y = arg.deltaY;
      };
    })(this));
    elHammer.on('panend', (function(_this) {
      return function(arg) {
        _this.scroll.release();
        y = 0;
      };
    })(this));
    this.scroll.on('position-change', (function(_this) {
      return function(event) {
        var item, _i, _len, _ref, _results;
        if (_this.viewportHeight > _this.insideHeight) {
          return;
        }
        _ref = _this.items;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          _results.push(item.el.moveYTo(_this.scroll.position));
        }
        return _results;
      };
    })(this));
    window.addEventListener('resize', (function(_this) {
      return function() {
        _this.updateScrollSize();
        return _this.updatePosition();
      };
    })(this));
  }

  Playlist.prototype.updatePosition = function() {
    this.width = window.innerWidth;
    if (this.model.playlists === true) {
      return this.show();
    } else {
      return this.hide();
    }
  };

  Playlist.prototype.show = function() {
    alert('yes' + this.width);
    return this.el.moveXTo(this.width - 200);
  };

  Playlist.prototype.hide = function() {
    alert('no');
    return this.el.moveXTo(this.width);
  };

  Playlist.prototype.newItem = function(data, cb) {
    return this.items.push(new MenuItem(this.model, this.el, data, cb));
  };

  Playlist.prototype.updateScrollSize = function() {
    this.viewportHeight = window.innerHeight;
    this.insideHeight = 300;
    return this.scroll.setSizeAndSpace(this.insideHeight, this.viewportHeight);
  };

  return Playlist;

})();

/*
//@ sourceMappingURL=Playlist.map
*/
