Foxie = require 'foxie'
# Pantomime = require 'pantomime'
Item =
	song: require './Item/SongItem'
	video: require './Item/VideoItem'
	album: require './Item/AlbumItem'

# Scrollable = require './scroll/scrollable'

module.exports = class HomePage

	constructor: (@mainView, @parentNode) ->

		@el = Foxie '.insider'
		.putIn @parentNode

		@mainView.model.on 'home-list', (items) =>

			for item, i in items

				new Item[item.type] @mainView, @el, item
				.hideMe()
				.showMe(i * 50)

			scroll = new IScroll @parentNode.node, { mouseWheel: true }


			return