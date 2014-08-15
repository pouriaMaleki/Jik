var Foxie, Lyric, Scrolla;

Foxie = require('Foxie');

Scrolla = require('../Scrolla');

module.exports = Lyric = (function() {
  function Lyric(parentNode, model) {
    var lyricHammer, x;
    this.parentNode = parentNode;
    this.model = model;
    this.el = Foxie('.musicplayer-lyric').innerHTML('Loading Lyric').setOpacity(0).trans(300).putIn(this.parentNode);
    this.scroll = new Scrolla({
      maxStretch: 500
    });
    this.updateScrollSize();
    console.log(this.model);
    x = 0;
    lyricHammer = new Hammer(this.parentNode.node);
    lyricHammer.on('tap', (function(_this) {
      return function(arg) {
        _this.model.toggleLyrics();
      };
    })(this));
    lyricHammer.on('pan', (function(_this) {
      return function(arg) {
        _this.scroll.drag(arg.deltaY - x);
        x = arg.deltaY;
        arg.preventDefault();
      };
    })(this));
    lyricHammer.on('panend', (function(_this) {
      return function(arg) {
        _this.scroll.release();
        x = 0;
      };
    })(this));
    this.scroll.on('position-change', (function(_this) {
      return function(event) {
        return _this.el.moveYTo(_this.scroll.position);
      };
    })(this));
    this.model.on('lyrics-hide', (function(_this) {
      return function() {
        _this.hide();
      };
    })(this));
    this.model.on('lyrics-show', (function(_this) {
      return function() {
        _this.show();
      };
    })(this));
  }

  Lyric.prototype.text = function(txt) {
    return this.el.innerHTML(txt);
  };

  Lyric.prototype.updateScrollSize = function() {
    this.posterHeight = this.parentNode.node.getBoundingClientRect().height;
    this.lyricHeight = this.el.node.getBoundingClientRect().height;
    return this.scroll.setSizeAndSpace(this.lyricHeight, this.posterHeight);
  };

  Lyric.prototype.hide = function() {
    return this.el.setOpacity(0);
  };

  Lyric.prototype.show = function() {
    return this.el.setOpacity(1);
  };

  return Lyric;

})();

/*
//@ sourceMappingURL=Lyric.map
*/
