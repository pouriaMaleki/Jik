var Playlists;

module.exports = Playlists = (function() {
  function Playlists(mainView, rightSwipe) {
    var plus;
    this.mainView = mainView;
    this.rightSwipe = rightSwipe;
    this.createNewPlaylist('Now Playing');
    this.createNewPlaylist('Favorites');
    plus = this.prepareNewPlaylist('+', (function(_this) {
      return function(arg, item) {
        return _this.startMakingNew(item);
      };
    })(this));
    plus.el.node.addEventListener('keydown', (function(_this) {
      return function(event) {
        if (event.keyCode === 13) {
          _this.endMakingNew(plus);
        }
        if (event.keyCode === 27) {
          return plus.el.attr('contenteditable', 'false');
        }
      };
    })(this));
    plus.el.node.addEventListener('blur', (function(_this) {
      return function() {
        if (plus.el.node.innerHTML === '<h4></h4>' || plus.el.node.innerHTML === '' || plus.el.node.innerHTML === '<h4> </h4>' || plus.el.node.innerHTML === ' ' || plus.el.node.innerHTML === '<h4>+</h4>' || plus.el.node.innerHTML === '+') {
          return _this.cancelMakingNew(plus);
        } else {
          return _this.endMakingNew(plus);
        }
      };
    })(this));
    this.createNewPlaylist('Default');
    this.rightSwipe.moveItemToEnd(plus);
  }

  Playlists.prototype.createNewPlaylist = function(text) {
    return this.prepareNewPlaylist(text, (function(_this) {
      return function() {
        return _this.rightSwipe.showPage(1);
      };
    })(this));
  };

  Playlists.prototype.cancelMakingNew = function(plus) {
    this.update(plus, '+');
    plus.el.attr('contenteditable', 'false');
    return this.rightSwipe.scroll.forceSetPosition(-this.rightSwipe.page1.node.getBoundingClientRect().height + this.rightSwipe.viewportHeight - 200);
  };

  Playlists.prototype.endMakingNew = function(plus) {
    plus.el.attr('contenteditable', 'false');
    this.createNewPlaylist(plus.el.node.innerText);
    this.update(plus, '+');
    this.rightSwipe.moveItemToEnd(plus);
    this.rightSwipe.updateScrollSize();
    return this.rightSwipe.scrollDownToEnd();
  };

  Playlists.prototype.startMakingNew = function(item) {
    this.rightSwipe.scrollUpToEdit();
    this.update(item, '');
    item.el.attr('contenteditable', 'true');
    return setTimeout(((function(_this) {
      return function() {
        return item.el.node.focus();
      };
    })(this)), 100);
  };

  Playlists.prototype.prepareNewPlaylist = function(text, cb) {
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
