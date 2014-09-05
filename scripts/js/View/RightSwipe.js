var Foxie, MenuItem, PlaylistSelector, Playlists, RightSwipe, Scrolla;

Foxie = require('Foxie');

PlaylistSelector = require('./RightSwipe/PlaylistSelector');

Playlists = require('./RightSwipe/Playlists');

MenuItem = require('./RightSwipe/MenuItem');

Scrolla = require('./Scrolla');

module.exports = RightSwipe = (function() {
  function RightSwipe(mainView) {
    var elHammer, y;
    this.mainView = mainView;
    this.model = this.mainView.model.page;
    this.items = [];
    this.el = Foxie('.rightSwipe').moveXTo(-200).trans(300).putIn(document.body);
    this.pages = Foxie('.rightSwipePages').trans(300).putIn(this.el);
    this.pages2 = Foxie('.rightSwipePages').moveXTo(-1000).putIn(this.el);
    this.selectorPage = Foxie('.rightSwipePage').putIn(this.pages2);
    this.page1 = Foxie('.rightSwipePage').putIn(this.pages);
    this.page2 = Foxie('.rightSwipePage').moveXTo(200).putIn(this.pages);
    elHammer = new Hammer(this.el.node);
    elHammer.on('panleft', (function(_this) {
      return function(arg) {
        return _this.model.hideMenu();
      };
    })(this));
    elHammer.on('panright', (function(_this) {
      return function(arg) {
        if (_this.model.menu === false) {
          return;
        }
        _this.showPage(0);
        return _this.playlists.hide();
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
    this.mainView.model.page.on('menu', (function(_this) {
      return function() {
        return _this.showMenu();
      };
    })(this));
    this.mainView.model.page.on('selector', (function(_this) {
      return function() {
        return _this.showSelector();
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
    this.newItem('</br>');
    this.newItem('Playlists', ((function(_this) {
      return function() {};
    })(this)), true);
    this.playlists = new Playlists(this.mainView, this);
    this.playlistSelector = new PlaylistSelector(this.mainView, this);
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

  RightSwipe.prototype.showPage = function(id) {
    return this.pages.moveXTo(-200 * id);
  };

  RightSwipe.prototype.show = function() {
    return this.el.moveXTo(0);
  };

  RightSwipe.prototype.hide = function() {
    return this.el.moveXTo(-200);
  };

  RightSwipe.prototype.newItem = function(data, cb, stay) {
    var item;
    item = new MenuItem(this.model, this.page1, data, cb, stay);
    this.items.push(item);
    return item;
  };

  RightSwipe.prototype.newItemInSelector = function(data, cb, stay) {
    var item;
    item = new MenuItem(this.model, this.selectorPage, data, cb, stay);
    return item;
  };

  RightSwipe.prototype.addItem = function(item) {
    return this.items.push(item);
  };

  RightSwipe.prototype.updateScrollSize = function() {
    this.viewportHeight = window.innerHeight;
    this.insideHeight = this.page1.node.getBoundingClientRect().height + 200;
    return this.scroll.setSizeAndSpace(this.insideHeight, this.viewportHeight);
  };

  RightSwipe.prototype.scrollUpToEdit = function() {
    return this.scroll.forceSetPosition(-this.page1.node.getBoundingClientRect().height + 100);
  };

  RightSwipe.prototype.scrollDownToEnd = function() {
    return this.scroll.forceSetPosition(-this.page1.node.getBoundingClientRect().height + this.viewportHeight - 200);
  };

  RightSwipe.prototype.removeItem = function(item) {
    return this.page1.node.removeChild(item.el.node);
  };

  RightSwipe.prototype.appendItem = function(item) {
    return this.page1.node.appendChild(item.el.node);
  };

  RightSwipe.prototype.moveItemToEnd = function(item) {
    this.removeItem(item);
    return this.appendItem(item);
  };

  RightSwipe.prototype.moveItemToEndInSelector = function(item) {
    this.selectorPage.node.removeChild(item.el.node);
    return this.selectorPage.node.appendChild(item.el.node);
  };

  RightSwipe.prototype.showMenu = function() {
    this.showPage(0);
    this.pages.moveXTo(0);
    return this.pages2.moveXTo(-1000);
  };

  RightSwipe.prototype.showSelector = function() {
    this.pages.moveXTo(-1000);
    return this.pages2.moveXTo(0);
  };

  return RightSwipe;

})();

/*
//@ sourceMappingURL=RightSwipe.map
*/
