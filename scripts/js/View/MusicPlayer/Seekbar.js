var Foxie, Seekbar;

Foxie = require('Foxie');

module.exports = Seekbar = (function() {
  function Seekbar(parentNode, model) {
    var elHammer, seekerHammer;
    this.parentNode = parentNode;
    this.model = model;
    this.el = Foxie('.musicplayer-seekcontainer').putIn(this.parentNode);
    this.seekbar = Foxie('.musicplayer-seekbar').putIn(this.el);
    this.buffer = Foxie('.musicplayer-buffer').putIn(this.el);
    this.seeker = Foxie('.musicplayer-seeker').putIn(this.el);
    this.updateSize();
    elHammer = new Hammer(this.el.node);
    elHammer.on('tap', (function(_this) {
      return function(arg) {
        return _this.model.seekTo(arg.srcEvent.layerX / _this.width);
      };
    })(this));
    elHammer.on('pan', (function(_this) {
      return function(arg) {
        _this.model.seekTo(arg.deltaX / _this.width);
        return _this.model.seeking = true;
      };
    })(this));
    elHammer.on('panend', (function(_this) {
      return function(arg) {
        return setTimeout(function() {
          return _this.model.seeking = false;
        });
      };
    })(this), 100);
    seekerHammer = new Hammer(this.seeker.node);
    seekerHammer.on('pan', (function(_this) {
      return function(arg) {
        _this.model.seekTo(arg.deltaX / _this.width);
        return _this.model.seeking = true;
      };
    })(this));
    seekerHammer.on('panend', (function(_this) {
      return function(arg) {
        return setTimeout(function() {
          return _this.model.seeking = false;
        });
      };
    })(this), 100);
    this.model.on('seeker-update', (function(_this) {
      return function(cent) {
        return _this.seeker.moveXTo(cent * _this.width);
      };
    })(this));
    this.model.on('buffer-update', (function(_this) {
      return function(cent) {
        return _this.buffer.moveXTo(cent * _this.width);
      };
    })(this));
  }

  Seekbar.prototype.updateSize = function() {
    return this.width = this.seekbar.node.getBoundingClientRect().width;
  };

  return Seekbar;

})();

/*
//@ sourceMappingURL=Seekbar.map
*/
