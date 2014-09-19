var Foxie, Item, Pages, Scrolla, SubnameSelector;

Foxie = require('foxie');

Item = {
  song: require('./Item/SongItem'),
  video: require('./Item/VideoItem'),
  album: require('./Item/AlbumItem'),
  artist: require('./Item/ArtistItem'),
  searchBar: require('./Item/SearchBar')
};

Scrolla = require('./Scrolla');

SubnameSelector = require('./Ribbon/SubnameSelector');

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
    this.showSearch = false;
    this.offsetScroll = -18;
    this.offsetScrollSearch = -32;
    this.cancelAutoScroll = false;
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
        _this.showSearch = false;
        if (_this.scroll.position > 100) {
          _this.pullDown.innerHTML('Release to refresh');
          _this.refresh = true;
        } else {
          _this.pullDown.innerHTML('Pull down to refresh');
          _this.refresh = false;
          _this.showSearch = true;
        }
        _this.scroll.drag(arg.deltaY - x);
        x = arg.deltaY;
        return _this.cancelAutoScroll = true;
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
          _this.pullDown.innerHTML('Refreshing');
        } else if (_this.scroll.position <= _this.scroll.min) {
          if (!_this.loadMore) {
            _this.model.loadmore();
            _this.loadMore = true;
          }
        } else if (_this.scroll.position > _this.offsetScroll && _this.showSearch === false) {
          _this.hidePullup();
        } else if (_this.scroll.position > _this.offsetScroll) {
          _this.hidePullupButSearch();
        }
        return _this.cancelAutoScroll = false;
      };
    })(this));
    this.searchBar = new Item.searchBar(this.mainView, this.el);
  }

  Pages.prototype._prepareSearchBar = function() {
    this.searchBar.onSearch((function(_this) {
      return function(data) {
        _this.model.setOption('search');
        return console.log(data);
      };
    })(this));
    return this.model.on('option', (function(_this) {
      return function(data) {
        if (!isNaN(data)) {
          return _this.searchBar.clear();
        }
      };
    })(this));
  };

  Pages.prototype.removeAll = function() {
    var item, _i, _len, _ref;
    _ref = this.items;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      item = _ref[_i];
      item.remove();
    }
    this.items = [];
    this.el.moveYTo(0);
    this.scroll.forceSetPosition(0);
  };

  Pages.prototype.addMultiple = function(itemDatas) {
    var i, item, itemData, _i, _len;
    for (i = _i = 0, _len = itemDatas.length; _i < _len; i = ++_i) {
      itemData = itemDatas[i];
      item = new Item[itemData.type](this.mainView, this.el, this, itemData, this.items.length).hideMe().showMe(i * 50);
      this.items.push(item);
    }
  };

  Pages.prototype.updateSize = function() {
    this.height = this.items.length * 100;
    return this.scroll.setSizeAndSpace(this.height, this.viewPort);
  };

  Pages.prototype.scrollTo = function(offset) {
    this.el.trans(300).moveYTo(offset);
    return setTimeout((function(_this) {
      return function() {
        _this.el.noTrans();
        return _this.scroll.forceSetPosition(offset);
      };
    })(this), 300);
  };

  Pages.prototype.scrollToItem = function(index) {
    return this.scrollTo(index * -78 + this.offsetScrollSearch);
  };

  Pages.prototype.hidePullup = function() {
    return setTimeout((function(_this) {
      return function() {
        if (_this.cancelAutoScroll === true) {
          return;
        }
        if (_this.searchBar.isClear() === true) {
          return _this.scrollTo(_this.offsetScroll + _this.offsetScrollSearch);
        } else {
          return _this.scrollTo(_this.offsetScroll);
        }
      };
    })(this), 400);
  };

  Pages.prototype.hidePullupButSearch = function() {
    return setTimeout((function(_this) {
      return function() {
        if (_this.cancelAutoScroll === true) {
          return;
        }
        return _this.scrollTo(_this.offsetScroll);
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
