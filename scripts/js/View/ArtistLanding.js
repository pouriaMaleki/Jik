var ArtistItems, ArtistLanding, Foxie;

Foxie = require('Foxie');

ArtistItems = require('./ArtistItems');

module.exports = ArtistLanding = (function() {
  function ArtistLanding(mainView) {
    var close, closeHammer;
    this.mainView = mainView;
    this.el = Foxie('.artistLanding').scaleYTo(0).trans(400).putIn(document.body);
    close = Foxie('.close').css('z-index', '10').putIn(this.el);
    closeHammer = new Hammer(close.node);
    closeHammer.on('tap pan', (function(_this) {
      return function(arg) {
        console.log('tap');
        return _this.mainView.model.artist.deselectArtist();
      };
    })(this));
    this.artistItems = new ArtistItems(this.mainView, this.el);
    this.mainView.model.artist.on('deselect-artist', (function(_this) {
      return function() {
        _this.hide();
        _this.artistItems.removeAll();
        return _this.artistItems.removeCover();
      };
    })(this));
    this.mainView.model.artist.on('select-artist', (function(_this) {
      return function(data) {
        if (data.artist != null) {
          _this.artistItems.updateCover(data.artist);
        }
        _this.artistItems.addMultiple(data.items);
        return _this.show();
      };
    })(this));
  }

  ArtistLanding.prototype.show = function() {
    this.el.scaleYTo(1);
    return this.artistItems.scrollToTop();
  };

  ArtistLanding.prototype.hide = function() {
    return this.el.scaleYTo(0);
  };

  return ArtistLanding;

})();

/*
//@ sourceMappingURL=ArtistLanding.map
*/
