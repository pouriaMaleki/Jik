Foxie = require 'foxie'
Pantomime = require 'pantomime'

module.exports = class Item

	constructor: (@mainView, @parentNode, data) ->

		@el = Foxie '.item'
		.perspective 4000
		.moveZTo 100
		.putIn @parentNode

		Pantomime.TouchyEl.get(@el.node).on 'tap', (e) =>

			@mainView.model.musicPlayer.play(data)

			return

		unless window.isTouchDevice

			@el.node.addEventListener 'click', =>

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
		# .rotateYTo Math.PI / 2

		@

	showMe: (delay) ->

		@el
		.wait delay, =>

			@el
			.trans 400
			.moveXTo 0
			.setOpacity 1
			# .rotateYTo 0

		@