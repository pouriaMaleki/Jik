var Foxie, MenuItem, RightSwipe;

Foxie = require('Foxie');

MenuItem = require('./RightSwipe/MenuItem');

module.exports = RightSwipe = (function() {
  function RightSwipe(mainView) {
    var btnHammer, elHammer;
    this.mainView = mainView;
    this.model = this.mainView.model.page;
    this.btn = Foxie('.rightSwipeBtn').putIn(this.mainView.el);
    this.el = Foxie('.rightSwipe').trans(300).moveXTo(-200).putIn(this.mainView.el);
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
  }

  RightSwipe.prototype.show = function() {
    return this.el.moveXTo(0);
  };

  RightSwipe.prototype.hide = function() {
    return this.el.moveXTo(-200);
  };

  RightSwipe.prototype.newItem = function(data, cb) {
    return new MenuItem(this.model, this.el, data, cb);
  };

  return RightSwipe;

})();

/*
//@ sourceMappingURL=RightSwipe.map
*/
