_Emitter = require './_Emitter'
MusicPlayerModel = require './MusicPlayerModel'
PageModel = require './PageModel'
HomeModel = require './PagesModel/HomeModel'
ArtistModel = require './PagesModel/ArtistModel'
AlbumModel = require './PagesModel/AlbumModel'
SongModel = require './PagesModel/SongModel'
VideoModel = require './PagesModel/VideoModel'

module.exports = class Model extends _Emitter

	constructor: ->

		super

		@musicPlayer = new MusicPlayerModel @

		@page = new PageModel @

		@home = new HomeModel @
		@artist = new ArtistModel @
		@album = new AlbumModel @
		@song = new SongModel @
		@video = new VideoModel @
