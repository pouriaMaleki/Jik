Foxie = require 'foxie'

module.exports = class Title

	constructor: (@parentNode, text, @width) ->

		@el =  Foxie '.ribbon-title-names'
		.innerHTML text
		.moveXTo @width
		.trans 300
		.putIn @parentNode

	getWidth: ->

		if @myWidth?

			return @myWidth

		@myWidth = @el.node.getBoundingClientRect().width

	moveTo: (x) ->

		@el
		.moveXTo x

	update: (@width) ->

		@el
		.noTrans()
		.moveXTo @width
		.trans 300