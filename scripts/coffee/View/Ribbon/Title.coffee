Foxie = require 'foxie'

module.exports = class Title

	constructor: (@parentNode, text) ->

		@el =  Foxie '.ribbon-title-icons.ribbon-title-' + text
		.putIn @parentNode

	active: ->

		@el.setOpacity 1

	inactive: ->

		@el.setOpacity 0.3