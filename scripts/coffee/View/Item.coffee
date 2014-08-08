Foxie = require 'Foxie'
Pantomime = require 'pantomime'

module.exports = class Item

	constructor: (@mainView, @parentNode, data) ->

		@el = Foxie '.item'
		.perspective 4000
		.moveZTo 100
		.putIn @parentNode

		hammer = new Hammer @el.node

		hammer.on 'tap', (arg) =>

			@mainView.model.musicPlayer.play(data)

		@title1 = Foxie '.item-songname'
		.putIn @el

		@title2 = Foxie '.item-artist'
		.innerHTML data.artist
		.putIn @el

		@poster = Foxie 'img.item-poster'
		.attr 'src', data.poster
		.putIn @el

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