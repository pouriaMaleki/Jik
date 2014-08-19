MusicPlayerModel = require './MusicPlayerModel'
VideoPlayer = require './VideoPlayer'
AlbumDetail = require './AlbumDetail'
ArtistModel = require './PagesModel/ArtistModel'
TitleModel = require './TitleModel'
AlbumModel = require './PagesModel/AlbumModel'
VideoModel = require './PagesModel/VideoModel'
HomeModel = require './PagesModel/HomeModel'
SongModel = require './PagesModel/SongModel'
Settings = require './Settings'
_Emitter = require './_Emitter'

module.exports = class Model extends _Emitter

	constructor: ->

		super

		@musicPlayer = new MusicPlayerModel @
		@videoPlayer = new VideoPlayer @

		@page = new TitleModel @

		@home = new HomeModel @
		@artist = new ArtistModel @
		@album = new AlbumModel @
		@song = new SongModel @
		@video = new VideoModel @

		@albumDetail = new AlbumDetail @

		@settings = new Settings @
