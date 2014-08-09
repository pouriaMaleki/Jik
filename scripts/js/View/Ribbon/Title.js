var Foxie, Title;

Foxie = require('foxie');

module.exports = Title = (function() {
  function Title(parentNode, text) {
    this.parentNode = parentNode;
    this.el = Foxie('.ribbon-title-icons.ribbon-title-' + text).putIn(this.parentNode);
  }

  Title.prototype.active = function() {
    return this.el.setOpacity(1);
  };

  Title.prototype.inactive = function() {
    return this.el.setOpacity(.4);
  };

  return Title;

})();

/*
//@ sourceMappingURL=Title.map
*/
