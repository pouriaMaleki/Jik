var Foxie, Settings;

Foxie = require('Foxie');

module.exports = Settings = (function() {
  function Settings(mainView) {
    var close, closeHammer;
    this.mainView = mainView;
    this.el = Foxie('.settings').scaleXTo(0).trans(400).putIn(document.body);
    close = Foxie('.close').css('z-index', '10').putIn(this.el);
    closeHammer = new Hammer(close.node);
    closeHammer.on('tap pan', (function(_this) {
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
    return this.el.scaleXTo(1);
  };

  Settings.prototype.hide = function() {
    return this.el.scaleXTo(0);
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
