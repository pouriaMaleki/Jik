var Foxie, Item, Pages, Scrolla;

Foxie = require('foxie');

Item = {
  song: require('./Item/SongItem'),
  video: require('./Item/VideoItem'),
  album: require('./Item/AlbumItem')
};

Scrolla = require('./Scrolla');

module.exports = Pages = (function() {
  function Pages(mainView, parentNode) {
    var hammer, x;
    this.mainView = mainView;
    this.parentNode = parentNode;
    this.el = Foxie('.insider').putIn(this.parentNode);
    this.items = [];
    this.pullDown = Foxie('.pullDown').putIn(this.el).innerHTML('Loading');
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
        } else {
          _this.pullDown.innerHTML('Pull down to refresh');
          _this.refresh = false;
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
            _this.model.loadmore();
            return _this.loadMore = true;
          }
        }
      };
    })(this));
    this.scroll.on('end', (function(_this) {
      return function() {
        if (_this.refresh) {
          _this.model.refresh();
          return _this.pullDown.innerHTML('Refreshing');
        } else if (_this.scroll.position <= _this.scroll.min) {
          if (!_this.loadMore) {
            _this.model.loadmore();
            return _this.loadMore = true;
          }
        } else if (_this.scroll.position > -22) {
          return _this.hidePullup();
        }
      };
    })(this));
  }

  Pages.prototype.removeAll = function() {
    var item, _i, _len, _ref;
    _ref = this.items;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      item = _ref[_i];
      item.remove();
    }
    this.items = [];
  };

  Pages.prototype.addMultiple = function(itemDatas) {
    var i, item, itemData, _i, _len;
    for (i = _i = 0, _len = itemDatas.length; _i < _len; i = ++_i) {
      itemData = itemDatas[i];
      item = new Item[itemData.type](this.mainView, this.el, itemData).hideMe().showMe(i * 50);
      this.items.push(item);
    }
  };

  Pages.prototype.updateSize = function() {
    this.height = this.el.node.getBoundingClientRect().height;
    return this.scroll.setSizeAndSpace(this.height, this.viewPort);
  };

  Pages.prototype.hidePullup = function() {
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

  Pages.prototype.doneLoad = function(more) {
    if (more == null) {
      more = false;
    }
    this.pullDown.innerHTML('Pull down to refresh');
    if (this.loadMore === false) {
      this.hidePullup();
    }
    this.loadMore = false;
    this.updateSize();
    if (!more) {
      return this.hidePullup();
    }
  };

  Pages.prototype.doneRefresh = function() {
    this.refresh = false;
    return this.updateSize();
  };

  return Pages;

})();

/*
//@ sourceMappingURL=Pages.map
*/
