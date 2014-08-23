Foxie = require 'foxie'
SubnameSelector = require './SubnameSelector'

module.exports = class Title

	constructor: (@mainView, @parentNode, text, @width) ->

		@el =  Foxie '.ribbon-title-names'
		.moveXTo @width
		.trans 300

		@name =  Foxie '.ribbon-title-name'
		.innerHTML text
		.putIn @el

		@selector = new SubnameSelector @mainView, @el

		@el
		.putIn @parentNode

	getSubnameSelector: ->

		@selector

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

	show: ->

		@el.moveXTo 0
		do @selector.show

	nextIam: ->

		@el.moveXTo @width - @getWidth() - 50
		do @selector.hide

	hideToLeft: ->

		@el.moveXTo -200
		do @selector.hide

	hideToRight: ->

		@el.moveXTo @width
		do @selector.hide