var Foxie, Item, Pages, Scrolla;

Foxie = require('foxie');

Item = {
  song: require('./Item/SongItem'),
  video: require('./Item/VideoItem'),
  album: require('./Item/AlbumItem'),
  artist: require('./Item/ArtistItem')
};

Scrolla = require('./Scrolla');

module.exports = Pages = (function() {
  function Pages(mainView, parentNode) {
    var hammer, x;
    this.mainView = mainView;
    this.parentNode = parentNode;
    this.el = Foxie('.insider').putIn(this.parentNode);
    this.items = [];
    window.addEventListener('resize', (function(_this) {
      return function() {
        _this.updateSize();
        return _this.updateCoverSize();
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
        return _this.el.moveYTo(_this.scroll.position);
      };
    })(this));
    this.scroll.on('end', (function(_this) {
      return function() {
        if (_this.refresh) {
          _this.model.refresh();
          return _this.pullDown.innerHTML('Refreshing');
        }
      };
    })(this));
    this.coverHolder = Foxie('.coverHolder').putIn(this.el);
    this.coverHolderSize = this.coverHolder.node.getBoundingClientRect().width * .6;
    this.coverHolder.css('height', this.coverHolderSize + 'px');
    this.itemHolder = Foxie('.itemHolder').css('top', this.coverHolderSize + 50 + 'px').putIn(this.el);
    this.cover = Foxie('img.cover').putIn(this.coverHolder);
    this.uplineHolder = Foxie('.uplineHolder').css('top', this.coverHolderSize + 20 + 'px').putIn(this.el);
    this.thumb = Foxie('img.thumb').putIn(this.coverHolder);
    this.artistName = Foxie('.artistName').putIn(this.uplineHolder);
    this.fans = Foxie('.fans').putIn(this.uplineHolder);
    this.follow = Foxie('.follow').putIn(this.uplineHolder);
    this.removeCover();
  }

  Pages.prototype.updateCover = function(artist) {
    this.cover.attr('src', artist.poster);
    this.thumb.attr('src', artist.thumb);
    this.artistName.innerHTML(artist.artist);
    this.fans.innerHTML(artist.fans + ' fan');
    if (artist.following === 0) {
      return this.follow.innerHTML('Follow');
    } else if (artist.following === 1) {
      return this.follow.innerHTML('Unfollow');
    }
  };

  Pages.prototype.removeCover = function() {
    return this.updateCover({
      poster: './/..//images//notfound.jpg',
      thumb: './/..//images//notfound.jpg',
      artist: null,
      fans: null,
      following: null
    });
  };

  Pages.prototype.scrollToTop = function() {
    this.el.moveYTo(0);
    return this.scroll.forceSetPosition(0);
  };

  Pages.prototype.addMultiple = function(itemDatas) {
    var i, item, itemData, _i, _len;
    for (i = _i = 0, _len = itemDatas.length; _i < _len; i = ++_i) {
      itemData = itemDatas[i];
      item = new Item[itemData.type](this.mainView, this.itemHolder, this, itemData, this.items.length).hideMe().showMe(i * 50);
      this.items.push(item);
    }
    this.updateSize();
  };

  Pages.prototype.removeAll = function() {
    var item, _i, _len, _ref;
    _ref = this.items;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      item = _ref[_i];
      item.remove();
    }
    this.items = [];
  };

  Pages.prototype.updateCoverSize = function() {
    this.coverHolderSize = this.coverHolder.node.getBoundingClientRect().width * .6;
    this.coverHolder.css('height', this.coverHolderSize + 'px');
    this.itemHolder.css('top', this.coverHolderSize + 50 + 'px');
    return this.uplineHolder.css('top', this.coverHolderSize + 20 + 'px');
  };

  Pages.prototype.updateSize = function() {
    this.viewPort = window.innerHeight;
    this.height = this.coverHolderSize + this.items.length * 100;
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

  return Pages;

})();

/*
//@ sourceMappingURL=ArtistItems.map
*/
