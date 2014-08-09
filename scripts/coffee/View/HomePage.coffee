Foxie = require 'foxie'
Item =
	song: require './Item/SongItem'
	video: require './Item/VideoItem'
	album: require './Item/AlbumItem'

module.exports = class HomePage

	constructor: (@mainView, @parentNode) ->

		@el = Foxie '.insider'
		.putIn @parentNode

		@pullDown = Foxie '.pullDown'
		.putIn @el
		.innerHTML 'Refreshing'

		@items = []
		@refresh = no
		@loadMore = no

		myscroll = new IScroll @parentNode.node,

			mouseWheel: true
			probeType: 1

		myscroll.scrollTo 0, parseInt(@pullDown.node.getBoundingClientRect.height)*(-1), 200

		myscroll.on 'scroll', =>

			if myscroll.y > 50

				@pullDown.innerHTML 'Release to refresh'

				@refresh = yes

			if myscroll.y < myscroll.maxScrollY

				unless @loadMore

					do @mainView.model.getHomeList

					@loadMore = yes

		myscroll.on 'scrollEnd', =>

			if @refresh

				do @mainView.model.refreshHomeList

				@pullDown.innerHTML 'Refreshing'

			if myscroll.y <= myscroll.maxScrollY

				unless @loadMore

					do @mainView.model.getHomeList

					@loadMore = yes

		@mainView.model.on 'home-list-refresh', =>

			@refresh = no

			for item in @items

				item.remove()

			@items = []

		@mainView.model.on 'home-list', (items) =>

			for item, i in items

				item = new Item[item.type] @mainView, @el, item
				.hideMe()
				.showMe(i * 50)

				@items.push item

				myscroll.refresh()

				@pullDown
				.innerHTML 'Pull down to refresh'

			if @loadMore is no

				console.log 'here'

				myscroll.scrollTo 0, -22, 200

			@loadMore = no

			return