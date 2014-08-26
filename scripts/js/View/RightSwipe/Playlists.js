var Playlists;

module.exports = Playlists = (function() {
  function Playlists(mainView, rightSwipe) {
    var item;
    this.mainView = mainView;
    this.rightSwipe = rightSwipe;
    this.newPlaylist('Now Playing', (function(_this) {
      return function() {
        return _this.rightSwipe.showPage(1);
      };
    })(this));
    this.newPlaylist('Favorites', (function(_this) {
      return function() {
        return _this.rightSwipe.showPage(1);
      };
    })(this));
    this.newPlaylist('Default', (function(_this) {
      return function() {
        return _this.rightSwipe.showPage(1);
      };
    })(this));
    item = this.newPlaylist('+', (function(_this) {
      return function(arg, item) {
        _this.update(item, '');
        item.el.attr('contenteditable', 'true');
        return item.el.node.focus();
      };
    })(this));
    item.el.node.addEventListener('keydown', (function(_this) {
      return function(event) {
        if (event.keyCode === 13) {
          item.el.attr('contenteditable', 'false');
          _this.newPlaylist(item.el.node.innerText, function() {
            return _this.rightSwipe.showPage(1);
          });
          _this.update(item, '+');
          _this.rightSwipe.page1.node.removeChild(item.el.node);
          return _this.rightSwipe.page1.node.appendChild(item.el.node);
        }
      };
    })(this));
  }

  Playlists.prototype.newPlaylist = function(text, cb) {
    return this.rightSwipe.newItem('<h4>' + text + '</h4>', cb, true);
  };

  Playlists.prototype.update = function(item, text) {
    return item.updateText('<h4>' + text + '</h4>');
  };

  return Playlists;

})();

/*
//@ sourceMappingURL=Playlists.map
*/
