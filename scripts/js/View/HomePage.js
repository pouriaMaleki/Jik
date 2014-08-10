var Foxie, HomePage, Item, Scrolla;

Foxie = require('foxie');

Item = {
  song: require('./Item/SongItem'),
  video: require('./Item/VideoItem'),
  album: require('./Item/AlbumItem')
};

Scrolla = require('./Scrolla');

module.exports = HomePage = (function() {
  function HomePage(mainView, parentNode) {
    var hammer, x;
    this.mainView = mainView;
    this.parentNode = parentNode;
    this.el = Foxie('.insider').putIn(this.parentNode);
    this.pullDown = Foxie('.pullDown').putIn(this.el).innerHTML('Refreshing');
    this.items = [];
    this.refresh = false;
    this.loadMore = true;
    this.viewPort = window.innerHeight;
    document.addEventListener('resize', (function(_this) {
      return function() {
        _this.viewPort = window.innerHeight;
        return _this.updateSize();
      };
    })(this));
    this.scroll = new Scrolla({
      maxStretch: 1000
    });
    this.scroll.setLeftEdge(0);
    this.updateSize();
    hammer = new Hammer(this.parentNode.node);
    hammer.get('pan').set({
      direction: Hammer.DIRECTION_ALL
    });
    x = 0;
    hammer.on('pan', (function(_this) {
      return function(arg) {
        if (_this.scroll.position > 100) {
          _this.pullDown.innerHTML('Release to refresh');
          _this.refresh = true;
        }
        _this.scroll.drag(arg.deltaY - x);
        return x = arg.deltaY;
      };
    })(this));
    hammer.on('panend', (function(_this) {
      return function(arg) {
        _this.scroll.release();
        return x = 0;
      };
    })(this));
    this.scroll.on('position-change', (function(_this) {
      return function(event) {
        _this.el.moveYTo(_this.scroll.position);
        if (_this.scroll.position < _this.scroll.min) {
          if (!_this.loadMore) {
            _this.mainView.model.home.loadmore();
            return _this.loadMore = true;
          }
        }
      };
    })(this));
    this.scroll.on('end', (function(_this) {
      return function() {
        if (_this.refresh) {
          _this.mainView.model.home.refresh();
          return _this.pullDown.innerHTML('Refreshing');
        } else if (_this.scroll.position <= _this.scroll.min) {
          if (!_this.loadMore) {
            _this.mainView.model.home.loadmore();
            return _this.loadMore = true;
          }
        } else if (_this.scroll.position === 0) {
          return _this.hidePullup();
        }
      };
    })(this));
    this.hidePullup();
    this.mainView.model.home.on('home-list-refresh', (function(_this) {
      return function() {
        var item, _i, _len, _ref;
        _this.refresh = false;
        _ref = _this.items;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          item.remove();
        }
        _this.items = [];
        return _this.updateSize();
      };
    })(this));
    this.mainView.model.home.on('home-load-more', (function(_this) {
      return function(itemsData) {
        var i, item, itemData, _i, _len;
        for (i = _i = 0, _len = itemsData.length; _i < _len; i = ++_i) {
          itemData = itemsData[i];
          item = new Item[itemData.type](_this.mainView, _this.el, itemData).hideMe().showMe(i * 50);
          _this.items.push(item);
        }
        _this.updateSize();
        _this.pullDown.innerHTML('Pull down to refresh');
        if (_this.loadMore === false) {
          _this.hidePullup();
        }
        return _this.loadMore = false;
      };
    })(this));
    this.mainView.model.home.on('home-list', (function(_this) {
      return function(itemsData) {
        var i, itemData, _fn, _i, _len;
        _fn = function(itemData, i) {
          return setTimeout(function() {
            var item;
            item = new Item[itemData.type](_this.mainView, _this.el, itemData).hideMe().showMe(i * 50);
            _this.items.push(item);
            return _this.updateSize();
          }, 100 * i);
        };
        for (i = _i = 0, _len = itemsData.length; _i < _len; i = ++_i) {
          itemData = itemsData[i];
          _fn(itemData, i);
          setTimeout(function() {
            _this.pullDown.innerHTML('Pull down to refresh');
            if (_this.loadMore === false) {
              _this.hidePullup();
            }
            return _this.loadMore = false;
          }, 100 * i);
        }
      };
    })(this));
  }

  HomePage.prototype.updateSize = function() {
    this.height = this.el.node.getBoundingClientRect().height;
    return this.scroll.setSizeAndSpace(this.height, this.viewPort);
  };

  HomePage.prototype.hidePullup = function() {
    var offset;
    offset = -22;
    return setTimeout((function(_this) {
      return function() {
        _this.el.trans(300).moveYTo(offset);
        return setTimeout(function() {
          _this.el.noTrans();
          return _this.scroll.setPosition(offset);
        }, 300);
      };
    })(this), 400);
  };

  return HomePage;

})();

/*
//@ sourceMappingURL=HomePage.map
*/
