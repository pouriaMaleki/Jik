var Foxie, Item, VideoItem,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Foxie = require('Foxie');

Item = require('../Item');

module.exports = VideoItem = (function(_super) {
  __extends(VideoItem, _super);

  function VideoItem(mainView, parentNode, data) {
    this.mainView = mainView;
    this.parentNode = parentNode;
    VideoItem.__super__.constructor.apply(this, arguments);
    this.title1.innerHTML(data.videoname);
    this.el.node.classList.add('video-item');
    this.title1.node.classList.add('video-item-songname');
    this.title2.node.classList.add('video-item-artist');
    this.title3 = Foxie('.video-item-time').innerHTML(data.time).putIn(this.el);
    this.poster.node.classList.add('video-item-poster');
    this.hammer.on('tap', (function(_this) {
      return function(arg) {
        return _this.mainView.model.musicPlayer.play(data);
      };
    })(this));
  }

  return VideoItem;

})(Item);

/*
//@ sourceMappingURL=VideoItem.map
*/
