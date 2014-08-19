Foxie = require 'Foxie'
Item = require '../Item'

module.exports = class VideoItem extends Item

	constructor: (@mainView, @parentNode, @page, data) ->

		super

		@title1
		.innerHTML data.videoname

		@el.node.classList.add 'video-item'

		@title1.node.classList.add 'video-item-songname'

		@title2.node.classList.add 'video-item-artist'


		@title3 = Foxie '.video-item-time'
		.innerHTML data.time
		.putIn @el

		@poster.node.classList.add 'video-item-poster'

		@hammer.on 'tap', (arg) => @mainView.model.videoPlayer.play(data)

