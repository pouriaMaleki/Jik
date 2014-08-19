var Foxie, Settings;

Foxie = require('Foxie');

module.exports = Settings = (function() {
  function Settings(mainView) {
    var elHammer;
    this.mainView = mainView;
    this.el = Foxie('.settings').rotateYTo(Math.PI / 2).trans(400).putIn(this.mainView.el);
    elHammer = new Hammer(this.el.node);
    elHammer.on('panleft panright', (function(_this) {
      return function(arg) {
        return _this.mainView.model.page.hideSettings();
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
    this.createCheckbox();
  }

  Settings.prototype.show = function() {
    return this.el.rotateYTo(0);
  };

  Settings.prototype.hide = function() {
    return this.el.rotateYTo(Math.PI / 2);
  };

  Settings.prototype.createCheckbox = function() {
    var changeStatus, chk, chkHammer;
    changeStatus = (function(_this) {
      return function(chk) {
        if (_this.mainView.model.settings.quality === true) {
          return chk.setOpacity(.5);
        } else {
          return chk.setOpacity(1);
        }
      };
    })(this);
    chk = Foxie('.settings-checkbox').innerHTML('Use Low Quality');
    changeStatus(chk);
    chk.trans(400).putIn(this.el);
    chkHammer = new Hammer(chk.node);
    chkHammer.on('tap', (function(_this) {
      return function(arg) {
        return _this.mainView.model.settings.switchQuality();
      };
    })(this));
    return this.mainView.model.settings.on('quality', (function(_this) {
      return function(flag) {
        return changeStatus(chk);
      };
    })(this));
  };

  return Settings;

})();

/*
//@ sourceMappingURL=Settings.map
*/
