Foxie = require 'Foxie'

module.exports = class Item

	constructor: (@mainView, @parentNode, @page, data) ->

		@el = Foxie '.item'
		.perspective 4000

		@hammer = new Hammer @el.node


		@title1 = Foxie '.item-songname'
		.putIn @el

		@title2 = Foxie '.item-artist'
		.innerHTML data.artist
		.putIn @el

		@poster = Foxie 'img.item-poster'
		.attr 'src', data.poster
		.putIn @el

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