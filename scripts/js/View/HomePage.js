var Foxie, HomePage, Item;

Foxie = require('foxie');

Item = {
  song: require('./Item/SongItem'),
  video: require('./Item/VideoItem'),
  album: require('./Item/AlbumItem')
};

module.exports = HomePage = (function() {
  function HomePage(mainView, parentNode) {
    this.mainView = mainView;
    this.parentNode = parentNode;
    this.el = Foxie('.insider').putIn(this.parentNode);
    this.mainView.model.on('home-list', (function(_this) {
      return function(items) {
        var i, item, scroll, _i, _len;
        for (i = _i = 0, _len = items.length; _i < _len; i = ++_i) {
          item = items[i];
          new Item[item.type](_this.mainView, _this.el, item).hideMe().showMe(i * 50);
        }
        scroll = new IScroll(_this.parentNode.node, {
          mouseWheel: true
        });
      };
    })(this));
  }

  return HomePage;

})();

/*
//@ sourceMappingURL=HomePage.map
*/
