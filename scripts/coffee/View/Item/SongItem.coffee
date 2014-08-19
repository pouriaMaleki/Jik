Foxie = require 'Foxie'
Item = require '../Item'

module.exports = class SongItem extends Item

	constructor: (@mainView, @parentNode, @page, data) ->

		super

		@title1
		.innerHTML data.songname

		@hammer.on 'tap', (arg) => @mainView.model.musicPlayer.play(data)
