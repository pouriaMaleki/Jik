_Emitter = require './_Emitter'

module.exports = class PageModel extends _Emitter

	constructor: ->

		super

		@currentActive = 0

	activeTitle: (title) ->

		@currentActive = title

		@_emit 'page-active', @currentActive
