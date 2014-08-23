var Foxie, MenuItem, RightSwipe, Scrolla;

Foxie = require('Foxie');

MenuItem = require('./RightSwipe/MenuItem');

Scrolla = require('./Scrolla');

module.exports = RightSwipe = (function() {
  function RightSwipe(mainView) {
    var btnHammer, elHammer, y;
    this.mainView = mainView;
    this.model = this.mainView.model.page;
    this.items = [];
    this.btn = Foxie('.rightSwipeBtn').putIn(this.mainView.el);
    this.el = Foxie('.rightSwipe').moveXTo(-200).trans(300).putIn(this.mainView.el);
    btnHammer = new Hammer(this.btn.node);
    btnHammer.on('tap', (function(_this) {
      return function(arg) {
        return _this.model.toggleRightSwipe();
      };
    })(this));
    elHammer = new Hammer(this.el.node);
    elHammer.on('panleft', (function(_this) {
      return function(arg) {
        return _this.model.hideRightSwipe();
      };
    })(this));
    this.mainView.model.page.on('right-swipe', (function(_this) {
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
        return _this.updateScrollSize();
      };
    })(this));
  }

  RightSwipe.prototype.show = function() {
    return this.el.moveXTo(0);
  };

  RightSwipe.prototype.hide = function() {
    return this.el.moveXTo(-200);
  };

  RightSwipe.prototype.newItem = function(data, cb) {
    return this.items.push(new MenuItem(this.model, this.el, data, cb));
  };

  RightSwipe.prototype.updateScrollSize = function() {
    this.viewportHeight = window.innerHeight;
    this.insideHeight = 300;
    return this.scroll.setSizeAndSpace(this.insideHeight, this.viewportHeight);
  };

  return RightSwipe;

})();

/*
//@ sourceMappingURL=RightSwipe.map
*/
