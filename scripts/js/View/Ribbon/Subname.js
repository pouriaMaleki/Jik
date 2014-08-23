var Foxie, Subname;

Foxie = require('foxie');

module.exports = Subname = (function() {
  function Subname(mainView, parentNode, text) {
    var subHammer;
    this.mainView = mainView;
    this.parentNode = parentNode;
    this.el = Foxie('.ribbon-title-subname').innerHTML(text).trans(300).putIn(this.parentNode);
    subHammer = new Hammer(this.el.node);
    subHammer.on('tap', (function(_this) {
      return function(arg) {
        return console.log(text);
      };
    })(this));
  }

  return Subname;

})();

/*
//@ sourceMappingURL=Subname.map
*/
