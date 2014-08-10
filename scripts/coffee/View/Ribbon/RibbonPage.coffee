Foxie = require 'foxie'

module.exports = class RibbonPage

	constructor: (@rootView, pos, index) ->

		@el = Foxie '.ribbon-page'
		.putIn @rootView.inside
		.moveXTo pos

		hammer = new Hammer @el.node

		hammer.on 'pan', (event) =>

			if Math.abs(event.deltaX) > Math.abs(event.deltaY)

				@rootView.inside
				.moveXTo event.deltaX - index * @rootView.ribbon.width

				@rootView.bg.moveXTo event.deltaX / 10 - index * 100 - 200

		hammer.on 'panend', (event) =>

			if Math.abs(event.deltaX) > Math.abs(event.deltaY) and Math.abs(event.deltaY) < 50

				if event.deltaX > 0

					do @rootView.model.page.prevActiveTitle

				else

					do @rootView.model.page.nextActiveTitle

			else

				@rootView.model.page.activeTitle index

	moveTo: (x) ->

		@el.moveXTo x