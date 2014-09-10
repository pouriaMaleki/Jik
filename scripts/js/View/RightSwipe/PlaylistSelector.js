var Foxie, Playlists;

Foxie = require('foxie');

module.exports = Playlists = (function() {
  function Playlists(mainView, rightSwipe) {
    var plus;
    this.mainView = mainView;
    this.rightSwipe = rightSwipe;
    this.playlists = {};
    plus = this.prepareNewPlaylist('+', (function(_this) {
      return function(arg, item) {
        return _this.startMakingNew(item);
      };
    })(this));
    plus.el.node.addEventListener('keydown', (function(_this) {
      return function(event) {
        if (event.keyCode === 13 || event.keyCode === 27) {
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
    this.mainView.model.playlists.on('playlist-add', (function(_this) {
      return function(playlistModel) {
        _this.createNewPlaylist(playlistModel);
        return _this.rightSwipe.moveItemToEndInSelector(plus);
      };
    })(this));
    this.mainView.model.playlists.readPlaylists();
  }

  Playlists.prototype.prepareNewPlaylist = function(text, cb) {
    return this.rightSwipe.newItemInSelector('<h4>' + text + '</h4>', cb, true);
  };

  Playlists.prototype.createNewPlaylist = function(playlistModel) {
    var el;
    el = this.rightSwipe.newItemInSelector(playlistModel.name, (function(_this) {
      return function() {
        return playlistModel.addSong(_this.mainView.model.musicPlayer.playingData);
      };
    })(this));
    return this.playlists[playlistModel.name] = el;
  };

  Playlists.prototype.hide = function() {
    var key, val, _ref, _results;
    _ref = this.playlists;
    _results = [];
    for (key in _ref) {
      val = _ref[key];
      _results.push(val.hide());
    }
    return _results;
  };

  Playlists.prototype.cancelMakingNew = function(plus) {
    this.update(plus, '+');
    return plus.el.attr('contenteditable', 'false');
  };

  Playlists.prototype.endMakingNew = function(plus) {
    var name;
    plus.el.attr('contenteditable', 'false');
    name = plus.el.node.innerText;
    this.mainView.model.playlists.createNewPlaylist(name);
    this.update(plus, '+');
    this.rightSwipe.moveItemToEndInSelector(plus);
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

  Playlists.prototype.update = function(item, text) {
    return item.updateText('<h4>' + text + '</h4>');
  };

  return Playlists;

})();

/*
//@ sourceMappingURL=PlaylistSelector.map
*/
