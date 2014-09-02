Foxie = require 'foxie'
Ribbon = require './Ribbon/Ribbon'
Artist = require './Pages/Artist'
Video = require './Pages/Video'
Album = require './Pages/Album'
Song = require './Pages/Song'
HomePage = require './Pages/HomePage'
Settings = require './Settings'
RightSwipe = require './RightSwipe'
MusicPlayer = require './MusicPlayer'
VideoPlayer = require './VideoPlayer'

module.exports = class Main

	constructor: (@model) ->

		@el = Foxie '.master'
		.putIn document.body

		@bg = Foxie '.master-bg'
		.moveXTo -200
		.trans 300
		.putIn @el

		hammer = new Hammer @el.node
		hammer.on 'tap pan swipe', (arg) => @model.page.hideRightSwipe()

		@inside = Foxie '.master-inside'

		@ribbon = new Ribbon @, ['home', 'artist', 'album', 'song', 'video'], [@model.home, @model.artist, @model.album, @model.song, @model.video]

		@inside.putIn @el

		@homePage = new HomePage @, @ribbon.getPage(0), @ribbon.getSubnameSelector(0)
		@artistPage = new Artist @, @ribbon.getPage(1), @ribbon.getSubnameSelector(1)
		@AlbumPage = new Album @, @ribbon.getPage(2), @ribbon.getSubnameSelector(2)
		@songPage = new Song @, @ribbon.getPage(3), @ribbon.getSubnameSelector(3)
		@videoPage = new Video @, @ribbon.getPage(4), @ribbon.getSubnameSelector(4)

		@rightSwipe = new RightSwipe @

		@musicPlayer = new MusicPlayer @
		@videoPlayer = new VideoPlayer @

		@settings = new Settings @

