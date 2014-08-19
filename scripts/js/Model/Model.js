var AlbumDetail, AlbumModel, ArtistModel, HomeModel, Model, MusicPlayerModel, Settings, SongModel, TitleModel, VideoModel, VideoPlayer, _Emitter,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

MusicPlayerModel = require('./MusicPlayerModel');

VideoPlayer = require('./VideoPlayer');

AlbumDetail = require('./AlbumDetail');

ArtistModel = require('./PagesModel/ArtistModel');

TitleModel = require('./TitleModel');

AlbumModel = require('./PagesModel/AlbumModel');

VideoModel = require('./PagesModel/VideoModel');

HomeModel = require('./PagesModel/HomeModel');

SongModel = require('./PagesModel/SongModel');

Settings = require('./Settings');

_Emitter = require('./_Emitter');

module.exports = Model = (function(_super) {
  __extends(Model, _super);

  function Model() {
    Model.__super__.constructor.apply(this, arguments);
    this.musicPlayer = new MusicPlayerModel(this);
    this.videoPlayer = new VideoPlayer(this);
    this.page = new TitleModel(this);
    this.home = new HomeModel(this);
    this.artist = new ArtistModel(this);
    this.album = new AlbumModel(this);
    this.song = new SongModel(this);
    this.video = new VideoModel(this);
    this.albumDetail = new AlbumDetail(this);
    this.settings = new Settings(this);
  }

  return Model;

})(_Emitter);

/*
//@ sourceMappingURL=Model.map
*/
