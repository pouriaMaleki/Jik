var Foxie, RibbonPage;

Foxie = require('foxie');

module.exports = RibbonPage = (function() {
  function RibbonPage(rootView, pos, index) {
    var hammer;
    this.rootView = rootView;
    this.el = Foxie('.ribbon-page').putIn(this.rootView.inside).moveXTo(pos);
    hammer = new Hammer(this.el.node);
    console.log(index);
    hammer.on('pan', (function(_this) {
      return function(event) {
        if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
          _this.rootView.inside.moveXTo(event.deltaX - index * _this.rootView.ribbon.width);
          return _this.rootView.bg.moveXTo(event.deltaX / 10 - index * 100 - 200);
        }
      };
    })(this));
    hammer.on('panend', (function(_this) {
      return function(event) {
        if (Math.abs(event.deltaX) > Math.abs(event.deltaY) && Math.abs(event.deltaY) < 50) {
          if (event.deltaX > 0) {
            return _this.rootView.model.page.prevActiveTitle();
          } else {
            return _this.rootView.model.page.nextActiveTitle();
          }
        } else {
          return _this.rootView.model.page.activeTitle(index);
        }
      };
    })(this));
  }

  RibbonPage.prototype.moveTo = function(x) {
    return this.el.moveXTo(x);
  };

  return RibbonPage;

})();

/*
//@ sourceMappingURL=RibbonPage.map
*/
