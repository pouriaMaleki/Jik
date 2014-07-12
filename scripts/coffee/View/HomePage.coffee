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

		# @scroll = new Scrollable @el.node.parentNode

		@mainView.model.on 'home-list', (items) =>

			for item, i in items

				new Item[item.type] @mainView, @el, item
				.hideMe()
				.showMe(i * 50)

				# if i is items.length - 1

				# 	@scroll.forceCalculated(@el.node.getBoundingClientRect().height + @el.node.getBoundingClientRect().top - window.innerHeight , 0)

			scroll = new IScroll @parentNode.node, { mouseWheel: true }

			`document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);`


			console.log 'sc22'
			return

		window.addEventListener 'resize', (event) =>

			# @scroll.forceCalculated(@el.node.getBoundingClientRect().height + @el.node.getBoundingClientRect().top - window.innerHeight, 0)

			return