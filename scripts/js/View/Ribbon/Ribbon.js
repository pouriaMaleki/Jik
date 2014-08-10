var Foxie, Pantomime, Ribbon, RibbonPage, Title;

Foxie = require('foxie');

Title = require('./Title');

Pantomime = require('pantomime');

RibbonPage = require('./RibbonPage');

module.exports = Ribbon = (function() {
  function Ribbon(rootView, t) {
    var i, line, title, _i, _len, _ref;
    this.rootView = rootView;
    this.t = t;
    this.width = window.innerWidth;
    this.ribbonBarSpace = 20;
    this.el = Foxie('.ribbon').moveZTo(150).putIn(this.rootView.el);
    line = Foxie('.ribbon-line').putIn(this.el);
    this.underLine = Foxie('.ribbon-underline').moveZTo(10).putIn(this.el);
    this.titles = [];
    this.pages = [];
    _ref = this.t;
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      title = _ref[i];
      this.addTitle(title);
      this.pages.push(new RibbonPage(this.rootView, i * this.width, i));
    }
    this.rootView.model.page.on('page-active', (function(_this) {
      return function(num) {
        return _this.showPage(num);
      };
    })(this));
    window.addEventListener('resize', (function(_this) {
      return function() {
        var page, _j, _len1, _ref1;
        _this.width = window.innerWidth;
        _ref1 = _this.pages;
        for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
          page = _ref1[i];
          page.moveTo(i * _this.width);
        }
        return _this.rootView.model.page.activeTitle();
      };
    })(this));
    this.rootView.model.page.activeTitle();
  }

  Ribbon.prototype.showPage = function(index) {
    var title, _i, _len, _ref;
    this.rootView.inside.trans(700).moveXTo(index * (-1 * this.width));
    _ref = this.titles;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      title = _ref[_i];
      title.inactive();
    }
    this.titles[index].active();
    return this.rootView.bg.moveXTo(index * -100 - 200);
  };

  Ribbon.prototype.getPage = function(index) {
    return this.pages[index].el;
  };

  Ribbon.prototype.addTitle = function(title) {
    var num, tit;
    tit = new Title(this.el, title);
    num = this.titles.length;
    (function(_this) {
      return (function(num) {
        var hammer;
        hammer = new Hammer(tit.el.node);
        hammer.on('tap', function(arg) {
          return _this.rootView.model.page.activeTitle(num);
        });
      });
    })(this)(num);
    return this.titles.push(tit);
  };

  return Ribbon;

})();

/*
//@ sourceMappingURL=Ribbon.map
*/
