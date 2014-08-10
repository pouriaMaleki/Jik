var AlbumModel, ArtistModel, HomeModel, Model, MusicPlayerModel, PageModel, SongModel, VideoModel, _Emitter,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_Emitter = require('./_Emitter');

MusicPlayerModel = require('./MusicPlayerModel');

PageModel = require('./PageModel');

HomeModel = require('./PagesModel/HomeModel');

ArtistModel = require('./PagesModel/ArtistModel');

AlbumModel = require('./PagesModel/AlbumModel');

SongModel = require('./PagesModel/SongModel');

VideoModel = require('./PagesModel/VideoModel');

module.exports = Model = (function(_super) {
  __extends(Model, _super);

  function Model() {
    Model.__super__.constructor.apply(this, arguments);
    this.musicPlayer = new MusicPlayerModel(this);
    this.page = new PageModel(this);
    this.home = new HomeModel(this);
    this.artist = new ArtistModel(this);
    this.album = new AlbumModel(this);
    this.song = new SongModel(this);
    this.video = new VideoModel(this);
  }

  return Model;

})(_Emitter);

/*
//@ sourceMappingURL=Model.map
*/
