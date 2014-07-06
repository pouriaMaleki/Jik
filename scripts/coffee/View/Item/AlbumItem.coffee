Foxie = require 'foxie'
Item = require '../Item'

module.exports = class AlbumItem extends Item

	constructor: (@mainView, @parentNode, data) ->

		super

		@title1
		.innerHTML data.album