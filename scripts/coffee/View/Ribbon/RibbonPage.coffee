Foxie = require 'foxie'

module.exports = class RibbonPage

	constructor: (@rootView, pos) ->

		@el = Foxie '.ribbon-page'
		.putIn @rootView.inside
		.moveXTo pos

	moveTo: (x) ->

		@el.moveXTo x