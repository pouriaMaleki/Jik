_Emitter = require './_Emitter'

module.exports = class PageModel extends _Emitter

	constructor: ->

		super

		@currentActive = 0

	activeTitle: (title) ->

		if title?

			@currentActive = title

		@_emit 'page-active', @currentActive

	prevActiveTitle: ->

		if @currentActive > 0

			@currentActive--

		@_emit 'page-active', @currentActive

	nextActiveTitle: ->

		if @currentActive < 4

			@currentActive++

		@_emit 'page-active', @currentActive