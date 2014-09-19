var Album, Artist, ArtistLanding, Foxie, HomePage, Main, MusicPlayer, Ribbon, RightSwipe, Search, Settings, Song, Video, VideoPlayer;

Foxie = require('foxie');

Ribbon = require('./Ribbon/Ribbon');

Artist = require('./Pages/Artist');

Video = require('./Pages/Video');

Album = require('./Pages/Album');

Song = require('./Pages/Song');

HomePage = require('./Pages/HomePage');

Search = require('./Search');

Settings = require('./Settings');

RightSwipe = require('./RightSwipe');

MusicPlayer = require('./MusicPlayer');

VideoPlayer = require('./VideoPlayer');

ArtistLanding = require('./ArtistLanding');

module.exports = Main = (function() {
  function Main(model) {
    var btnHammer, hammer;
    this.model = model;
    this.el = Foxie('.master').putIn(document.body);
    this.bg = Foxie('.master-bg').moveXTo(-200).trans(300).putIn(this.el);
    hammer = new Hammer(this.el.node);
    hammer.on('tap pan swipe', (function(_this) {
      return function(arg) {
        return _this.model.page.hideRightSwipe();
      };
    })(this));
    this.inside = Foxie('.master-inside');
    this.ribbon = new Ribbon(this, ['home', 'artist', 'album', 'song', 'video'], [this.model.home, this.model.artist, this.model.album, this.model.song, this.model.video]);
    this.inside.putIn(this.el);
    this.homePage = new HomePage(this, this.ribbon.getPage(0), this.ribbon.getSubnameSelector(0));
    this.artistPage = new Artist(this, this.ribbon.getPage(1), this.ribbon.getSubnameSelector(1));
    this.AlbumPage = new Album(this, this.ribbon.getPage(2), this.ribbon.getSubnameSelector(2));
    this.songPage = new Song(this, this.ribbon.getPage(3), this.ribbon.getSubnameSelector(3));
    this.videoPage = new Video(this, this.ribbon.getPage(4), this.ribbon.getSubnameSelector(4));
    this.btn = Foxie('.rightSwipeBtn').putIn(document.body);
    btnHammer = new Hammer(this.btn.node);
    btnHammer.on('tap', (function(_this) {
      return function(arg) {
        return _this.model.page.toggleMenu();
      };
    })(this));
    this.artistLanding = new ArtistLanding(this);
    this.musicPlayer = new MusicPlayer(this);
    this.videoPlayer = new VideoPlayer(this);
    this.settings = new Settings(this);
    this.rightSwipe = new RightSwipe(this);
  }

  return Main;

})();

/*
//@ sourceMappingURL=Main.map
*/
