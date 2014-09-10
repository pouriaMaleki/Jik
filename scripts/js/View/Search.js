var Foxie, Settings;

Foxie = require('Foxie');

module.exports = Settings = (function() {
  function Settings(mainView) {
    var elHammer;
    this.mainView = mainView;
    this.el = Foxie('.settings').scaleXTo(0).trans(400).putIn(document.body);
    elHammer = new Hammer(this.el.node);
    elHammer.on('panleft panright', (function(_this) {
      return function(arg) {
        return _this.mainView.model.page.hideSearch();
      };
    })(this));
    this.mainView.model.page.on('search', (function(_this) {
      return function(flag) {
        if (flag) {
          return _this.show();
        } else {
          return _this.hide();
        }
      };
    })(this));
  }

  Settings.prototype.show = function() {
    return this.el.scaleXTo(1);
  };

  Settings.prototype.hide = function() {
    return this.el.scaleXTo(0);
  };

  return Settings;

})();

/*
//@ sourceMappingURL=Search.map
*/
