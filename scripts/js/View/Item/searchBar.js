var Foxie, SearchBar;

Foxie = require('Foxie');

module.exports = SearchBar = (function() {
  function SearchBar(mainView, parentNode) {
    this.mainView = mainView;
    this.parentNode = parentNode;
    this.el = Foxie('.item.searchBar').rotateXTo(0);
    this.titlesContainer = Foxie('.titles-container').putIn(this.el);
    this.hammer = new Hammer(this.titlesContainer.node);
    this.input = Foxie('input.search-input').attr('type', 'text').putIn(this.titlesContainer);
    this.input.node.addEventListener('keydown', (function(_this) {
      return function(event) {
        if (event.keyCode === 13 || event.keyCode === 27) {
          return _this.input.node.blur();
        }
      };
    })(this));
    this.input.node.addEventListener('change', (function(_this) {
      return function(event) {
        return _this.cb(_this.input.node.value);
      };
    })(this));
    this.searchBtn = Foxie('.search-icon').putIn(this.titlesContainer);
    this.el.putIn(this.parentNode);
  }

  SearchBar.prototype.addPlaceholder = function(text) {
    return this.input.attr('placeholder', text);
  };

  SearchBar.prototype.onSearch = function(cb) {
    this.cb = cb;
  };

  SearchBar.prototype.clear = function() {
    return this.input.node.value = '';
  };

  SearchBar.prototype.isClear = function() {
    return this.input.node.value === '';
  };

  return SearchBar;

})();

/*
//@ sourceMappingURL=searchBar.map
*/
