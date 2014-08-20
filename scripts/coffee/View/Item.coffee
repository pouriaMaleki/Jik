Foxie = require 'Foxie'

module.exports = class Item

	constructor: (@mainView, @parentNode, @page, data, @count) ->

		@el = Foxie '.item'
		.perspective 4000

		@titlesContainer = Foxie '.titles-container'
		.putIn @el

		@hammer = new Hammer @titlesContainer.node

		@title1 = Foxie '.item-songname'
		.putIn @titlesContainer

		@title2 = Foxie '.item-artist'
		.innerHTML data.artist
		.putIn @titlesContainer

		@poster = Foxie 'img.item-poster'
		.attr 'src', data.poster
		.putIn @titlesContainer

		@el
		.putIn @parentNode

	hideMe: ->

		@el
		.noTrans()
		.moveXTo 100
		.setOpacity 0

		@

	showMe: (delay) ->

		@el
		.wait delay, =>

			@el
			.trans 400
			.moveXTo 0
			.setOpacity 1

		@

	remove: ->

		@parentNode.node.removeChild @el.node