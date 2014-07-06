Scrolls = require './scrolls'
Pantomime = require 'pantomime'
TouchyEl = Pantomime.TouchyEl

module.exports = class Scrollable

	constructor: (@node) ->

		@_scrolls = new Scrolls @node

		@tel = TouchyEl.get @node

		@tel.on 'move', (pos) =>

			@_scrolls.drag pos.absX, pos.absY

		@tel.on 'move:end', =>

			@_scrolls.release()

		setTimeout =>

			do @recalculate

		, 1000

	recalculate: ->


		# console.log @_scrolls

		@_scrolls._scrollerY._resetSizeAndSpace @_scrolls._childEl.getBoundingClientRect().height + 100, @_scrolls.node.getBoundingClientRect().height

		console.log @_scrolls._childEl.getBoundingClientRect().height + 100

	forceCalculated: (x, s) ->


		# console.log @_scrolls

		@_scrolls._scrollerY._resetSizeAndSpace x, s