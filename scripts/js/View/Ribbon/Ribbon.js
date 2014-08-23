var Foxie, Ribbon, RibbonPage, Title;

Foxie = require('foxie');

Title = require('./Title');

RibbonPage = require('./RibbonPage');

module.exports = Ribbon = (function() {
  function Ribbon(rootView, t, models) {
    var i, line, title, _i, _len, _ref;
    this.rootView = rootView;
    this.t = t;
    this.models = models;
    this.width = window.innerWidth;
    this.ribbonBarSpace = 20;
    this.el = Foxie('.ribbon').putIn(this.rootView.el);
    line = Foxie('.ribbon-line').putIn(this.el);
    this.underLine = Foxie('.ribbon-underline').putIn(this.el);
    this.titles = [];
    this.pages = [];
    this.visitedPageFirstTime = [];
    _ref = this.t;
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      title = _ref[i];
      this.addTitle(title);
      this.pages.push(new RibbonPage(this.rootView, i * this.width, i));
      this.visitedPageFirstTime.push(false);
    }
    this.rootView.model.page.on('page-active', (function(_this) {
      return function(num) {
        return _this.showPage(num);
      };
    })(this));
    window.addEventListener('resize', (function(_this) {
      return function() {
        var page, _j, _k, _len1, _len2, _ref1, _ref2;
        _this.width = window.innerWidth;
        _ref1 = _this.titles;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          title = _ref1[_j];
          title.width = _this.width;
        }
        _this.showPage(_this.rootView.model.page.currentActive);
        _ref2 = _this.pages;
        for (i = _k = 0, _len2 = _ref2.length; _k < _len2; i = ++_k) {
          page = _ref2[i];
          page.moveTo(i * _this.width);
        }
        return _this.rootView.model.page.activeTitle();
      };
    })(this));
    this.rootView.model.page.activeTitle();
  }

  Ribbon.prototype.showPage = function(index) {
    var i, title, _i, _len, _ref;
    if (this.visitedPageFirstTime[index] === false) {
      this.models[index].get();
    }
    this.visitedPageFirstTime[index] = true;
    this.rootView.inside.trans(700).moveXTo(index * (-1 * this.width));
    _ref = this.titles;
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      title = _ref[i];
      if (i < index) {
        title.hideToLeft();
      } else if (i === index + 1) {
        title.nextIam();
      } else if (i > index + 1) {
        title.hideToRight();
      } else {
        title.show();
      }
    }
    return this.rootView.bg.moveXTo(index * -100 - 200);
  };

  Ribbon.prototype.getPage = function(index) {
    return this.pages[index].el;
  };

  Ribbon.prototype.getSubnameSelector = function(index) {
    return this.titles[index].getSubnameSelector();
  };

  Ribbon.prototype.addTitle = function(title) {
    var tit;
    tit = new Title(this.rootView, this.el, title, this.width);
    return this.titles.push(tit);
  };

  return Ribbon;

})();

/*
//@ sourceMappingURL=Ribbon.map
*/
