var Foxie, Settings;

Foxie = require('Foxie');

module.exports = Settings = (function() {
  function Settings(mainView) {
    var elHammer;
    this.mainView = mainView;
    this.model = this.mainView.model.page;
    this.el = Foxie('.settings').rotateYTo(Math.PI / 2).trans(400).putIn(this.mainView.el);
    elHammer = new Hammer(this.el.node);
    elHammer.on('panleft panright', (function(_this) {
      return function(arg) {
        return _this.model.hideSettings();
      };
    })(this));
    this.mainView.model.page.on('settings', (function(_this) {
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
    return this.el.rotateYTo(0);
  };

  Settings.prototype.hide = function() {
    return this.el.rotateYTo(Math.PI / 2);
  };

  return Settings;

})();

/*
//@ sourceMappingURL=Settings.map
*/
