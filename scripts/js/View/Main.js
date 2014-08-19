var Artist, Foxie, HomePage, Main, MusicPlayer, Ribbon, RightSwipe, Settings, VideoPlayer;

Foxie = require('foxie');

Ribbon = require('./Ribbon/Ribbon');

Artist = require('./Pages/Artist');

HomePage = require('./Pages/HomePage');

Settings = require('./Settings');

RightSwipe = require('./RightSwipe');

MusicPlayer = require('./MusicPlayer');

VideoPlayer = require('./VideoPlayer');

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
    this.rightSwipe = new RightSwipe(this);
    this.musicPlayer = new MusicPlayer(this);
    this.videoPlayer = new VideoPlayer(this);
    this.settings = new Settings(this);
  }

  return Main;

})();

/*
//@ sourceMappingURL=Main.map
*/
