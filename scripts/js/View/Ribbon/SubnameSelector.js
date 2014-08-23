var Foxie, SubnameSelector;

Foxie = require('foxie');

module.exports = SubnameSelector = (function() {
  function SubnameSelector(mainView, parentNode) {
    this.mainView = mainView;
    this.parentNode = parentNode;
    this.el = Foxie('.ribbon-title-subnameSelector').trans(300).putIn(this.parentNode);
    this.subnames = [];
    this.hide();
  }

  SubnameSelector.prototype.activate = function(id) {
    var index, subname, _i, _len, _ref, _results;
    _ref = this.subnames;
    _results = [];
    for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
      subname = _ref[index];
      if (id === index) {
        _results.push(subname.setOpacity(1));
      } else {
        _results.push(subname.setOpacity(.5));
      }
    }
    return _results;
  };

  SubnameSelector.prototype.setModel = function(model) {
    this.model = model;
    return this.model.on('option', (function(_this) {
      return function(id) {
        return _this.activate(id);
      };
    })(this));
  };

  SubnameSelector.prototype.create = function(text) {
    var id, subHammer, subname;
    subname = Foxie('.ribbon-title-subnameSelected').innerHTML(text).trans(300).putIn(this.el);
    id = this.subnames.length;
    this.subnames.push(subname);
    subHammer = new Hammer(subname.node);
    return subHammer.on('tap', (function(_this) {
      return function(arg) {
        return _this.model.setOption(id);
      };
    })(this));
  };

  SubnameSelector.prototype.hide = function() {
    return this.el.scaleXTo(0);
  };

  SubnameSelector.prototype.show = function() {
    return this.el.scaleXTo(1);
  };

  return SubnameSelector;

})();

/*
//@ sourceMappingURL=SubnameSelector.map
*/
