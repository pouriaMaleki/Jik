var Artist, Foxie, HomePage, Main, MusicPlayer, Ribbon, RightSwipe;

Foxie = require('foxie');

Ribbon = require('./Ribbon/Ribbon');

Artist = require('./Pages/Artist');

HomePage = require('./Pages/HomePage');

MusicPlayer = require('./MusicPlayer');

RightSwipe = require('./RightSwipe');

module.exports = Main = (function() {
  function Main(model) {
    this.model = model;
    this.el = Foxie('.master').putIn(document.body);
    this.bg = Foxie('.master-bg').moveXTo(-200).trans(300).putIn(this.el);
    this.inside = Foxie('.master-inside');
    this.ribbon = new Ribbon(this, ['home', 'artist', 'album', 'song', 'video']);
    this.inside.putIn(this.el);
    this.homePage = new HomePage(this, this.ribbon.getPage(0));
    this.artistPage = new Artist(this, this.ribbon.getPage(1));
    this.musicPlayer = new MusicPlayer(this);
    this.rightSwipe = new RightSwipe(this);
  }

  return Main;

})();

/*
//@ sourceMappingURL=Main.map
*/
