var Playlists;

module.exports = Playlists = (function() {
  function Playlists(mainView, rightSwipe) {
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
    this.newPlaylist('+', (function(_this) {
      return function(arg, item) {
        _this.update(item, '');
        item.el.attr('contenteditable', 'true');
        item.el.node.focus();
        return item.el.node.addEventListener('keydown', function(event) {
          if (event.keyCode === 13) {
            item.el.attr('contenteditable', 'false');
            return _this.update(item, item.el.node.innerText);
          }
        });
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
