var Foxie, RightSwipe;

Foxie = require('Foxie');

module.exports = RightSwipe = (function() {
  function RightSwipe(mainView) {
    this.mainView = mainView;
    this.el = Foxie('.rightSwipe').trans(300).moveXTo(-200).putIn(this.mainView.el);
    this.btn = Foxie('.rightSwipeBtn').putIn(this.mainView.el);
  }

  RightSwipe.prototype.show = function() {
    return this.el.moveXTo(0);
  };

  RightSwipe.prototype.hide = function() {
    return this.el.moveXTo(-200);
  };

  return RightSwipe;

})();

/*
//@ sourceMappingURL=RightSwipe.map
*/
