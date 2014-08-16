Foxie = require 'foxie'
Ribbon = require './Ribbon/Ribbon'
Artist = require './Pages/Artist'
HomePage = require './Pages/HomePage'
Settings = require './Settings'
RightSwipe = require './RightSwipe'
MusicPlayer = require './MusicPlayer'

module.exports = class Main

	constructor: (@model) ->

		@el = Foxie '.master'
		.putIn document.body

		@bg = Foxie '.master-bg'
		.moveXTo -200
		.trans 300
		.putIn @el

		@inside = Foxie '.master-inside'

		@ribbon = new Ribbon @, ['home', 'artist', 'album', 'song', 'video']

		@inside.putIn @el

		@homePage = new HomePage @, @ribbon.getPage(0)
		@artistPage = new Artist @, @ribbon.getPage(1)
		# @homePage = new HomePage @, @ribbon.getPage(2)
		# @homePage = new HomePage @, @ribbon.getPage(3)
		# @homePage = new HomePage @, @ribbon.getPage(4)

		@rightSwipe = new RightSwipe @

		@musicPlayer = new MusicPlayer @

		@settings = new Settings @

