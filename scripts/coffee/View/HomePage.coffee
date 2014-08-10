Foxie = require 'foxie'
Item =
	song: require './Item/SongItem'
	video: require './Item/VideoItem'
	album: require './Item/AlbumItem'

Scrolla = require './Scrolla'

module.exports = class HomePage

	constructor: (@mainView, @parentNode) ->

		@el = Foxie '.insider'
		.putIn @parentNode

		@pullDown = Foxie '.pullDown'
		.putIn @el
		.innerHTML 'Refreshing'

		@items = []
		@refresh = no
		@loadMore = yes

		@viewPort = window.innerHeight

		document.addEventListener 'resize', =>

			@viewPort = window.innerHeight

			do @updateSize

		@scroll = new Scrolla maxStretch: 1000

		@scroll
		.setLeftEdge 0

		do @updateSize

		hammer = new Hammer @parentNode.node
		hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL })

		x = 0

		hammer.on 'pan', (arg) =>

			@scroll.drag arg.deltaY - x
			x = arg.deltaY

		hammer.on 'panend', (arg) =>

			@scroll.release()

			x = 0

		@scroll.on 'position-change', (event) =>

			@el.moveYTo @scroll.position

			if @scroll.position > 100

				@pullDown.innerHTML 'Release to refresh'

				@refresh = yes

			if @scroll.position < @scroll.min

				console.log 'loadMore'

				unless @loadMore

					do @mainView.model.home.get

					@loadMore = yes

		@scroll.on 'end', =>

			if @refresh

				do @mainView.model.home.refresh

				@pullDown.innerHTML 'Refreshing'

			else if @scroll.position <= @scroll.min

				console.log 'loadMore'

				unless @loadMore

					do @mainView.model.home.get

					@loadMore = yes

			else if @scroll.position is 0

				do @hidePullup


		do @hidePullup

		@mainView.model.home.on 'home-list-refresh', =>

			@refresh = no

			for item in @items

				item.remove()

			@items = []

			do @updateSize

		@mainView.model.home.on 'home-list', (items) =>

			for item, i in items

				item = new Item[item.type] @mainView, @el, item
				.hideMe()
				.showMe(i * 50)

				@items.push item

				@pullDown
				.innerHTML 'Pull down to refresh'

			do @updateSize

			if @loadMore is no

				do @hidePullup

			@loadMore = no

			return

	updateSize: ->

		@height = @el.node.getBoundingClientRect().height

		@scroll.setSizeAndSpace @height, @viewPort

	hidePullup: ->

		offset = -22

		setTimeout =>

			@el
			.trans 300
			.moveYTo offset

			setTimeout =>

				@el.noTrans()
				@scroll.setPosition offset

			, 300

		, 400