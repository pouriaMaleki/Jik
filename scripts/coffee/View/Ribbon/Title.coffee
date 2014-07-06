Foxie = require 'foxie'

module.exports = class Title

	constructor: (@parentNode, text, @position) ->

		@el =  Foxie '.ribbon-title'
		.moveXTo @position
		.innerHTML text
		.putIn @parentNode

		@size = 0

	getSize: ->

		if @size is 0

			@size = parseInt(getComputedStyle(@el.node).width)

		@size