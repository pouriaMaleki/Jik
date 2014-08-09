var Foxie, HomePage, Item;

Foxie = require('foxie');

Item = {
  song: require('./Item/SongItem'),
  video: require('./Item/VideoItem'),
  album: require('./Item/AlbumItem')
};

module.exports = HomePage = (function() {
  function HomePage(mainView, parentNode) {
    var myscroll;
    this.mainView = mainView;
    this.parentNode = parentNode;
    this.el = Foxie('.insider').putIn(this.parentNode);
    this.pullDown = Foxie('.pullDown').putIn(this.el).innerHTML('Refreshing');
    this.items = [];
    this.refresh = false;
    this.loadMore = false;
    myscroll = new IScroll(this.parentNode.node, {
      mouseWheel: true,
      probeType: 1
    });
    myscroll.scrollTo(0, parseInt(this.pullDown.node.getBoundingClientRect.height) * (-1), 200);
    myscroll.on('scroll', (function(_this) {
      return function() {
        if (myscroll.y > 50) {
          _this.pullDown.innerHTML('Release to refresh');
          _this.refresh = true;
        }
        if (myscroll.y < myscroll.maxScrollY) {
          if (!_this.loadMore) {
            _this.mainView.model.getHomeList();
            return _this.loadMore = true;
          }
        }
      };
    })(this));
    myscroll.on('scrollEnd', (function(_this) {
      return function() {
        if (_this.refresh) {
          _this.mainView.model.refreshHomeList();
          _this.pullDown.innerHTML('Refreshing');
        }
        if (myscroll.y <= myscroll.maxScrollY) {
          if (!_this.loadMore) {
            _this.mainView.model.getHomeList();
            return _this.loadMore = true;
          }
        }
      };
    })(this));
    this.mainView.model.on('home-list-refresh', (function(_this) {
      return function() {
        var item, _i, _len, _ref;
        _this.refresh = false;
        _ref = _this.items;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          item.remove();
        }
        return _this.items = [];
      };
    })(this));
    this.mainView.model.on('home-list', (function(_this) {
      return function(items) {
        var i, item, _i, _len;
        for (i = _i = 0, _len = items.length; _i < _len; i = ++_i) {
          item = items[i];
          item = new Item[item.type](_this.mainView, _this.el, item).hideMe().showMe(i * 50);
          _this.items.push(item);
          myscroll.refresh();
          _this.pullDown.innerHTML('Pull down to refresh');
        }
        if (_this.loadMore === false) {
          console.log('here');
          myscroll.scrollTo(0, -22, 200);
        }
        _this.loadMore = false;
      };
    })(this));
  }

  return HomePage;

})();

/*
//@ sourceMappingURL=HomePage.map
*/
