Foxie = require 'foxie'
Ribbon = require './Ribbon/Ribbon'
HomePage = require './HomePage'
MusicPlayer = require './MusicPlayer'

module.exports = class Main

	constructor: (@model) ->

		@el = Foxie '.master'
		.putIn document.body

		@inside = Foxie '.master-inside'
		.moveZTo 100
		.putIn @el


		@ribbon = new Ribbon @, ['Home', 'Artists']

		@homePage = new HomePage @, @ribbon.getPage(0)

		@musicPlayer = new MusicPlayer @
