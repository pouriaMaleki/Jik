Foxie = require 'foxie'
Item = require '../Item'

module.exports = class SongItem extends Item

	constructor: (@mainView, @parentNode, data) ->

		super

		@title1
		.innerHTML data.songname