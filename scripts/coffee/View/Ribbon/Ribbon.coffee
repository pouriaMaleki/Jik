Foxie = require 'foxie'
Title = require './Title'
Pantomime = require 'pantomime'
RibbonPage = require './RibbonPage'
module.exports = class Ribbon

	constructor: (@rootView, @t) ->

		@width = window.innerWidth
		@ribbonBarSpace = 50

		@el = Foxie '.ribbon'
		.putIn @rootView.el

		line = Foxie '.ribbon-line'
		.putIn @el

		@underLine = Foxie '.ribbon-underline'
		.moveZTo 10
		.putIn @el

		@titles = []
		@pages = []

		for title, i in @t

			@addTitle title

			@pages.push new RibbonPage @rootView, (i * @width)

		@rootView.model.page.on 'page-active', (num) =>

			@moveTo num

			@showPage num

		window.addEventListener 'resize', =>

			@width = window.innerWidth

			for page, i in @pages

				page.moveTo i * @width

	showPage: (index) ->

		@rootView.inside
		.trans 700
		.moveXTo index * (-1 * @width)

	getPage: (index) ->

		@pages[index].el

	_setUnderlineWidth: (width) ->

		@underLine
		.trans 300
		.setWidth width

	_setUnderlinePosition: (position) ->

		@underLine
		.trans 300
		.moveXTo position

	addTitle: (title) ->

		tit = new Title @el, title, @ribbonBarSpace + @ribbonBarSpace * 2 * @titles.length

		num = @titles.length

		do (num) =>

			Pantomime.TouchyEl.get(tit.el.node).on 'tap', (e) =>

				@rootView.model.page.activeTitle num

				return

			unless window.isTouchDevice

				tit.el.node.addEventListener 'click', =>

					@rootView.model.page.activeTitle num

					return

			return

		@titles.push tit

		if @titles.length is 1

			# buggy getComputedStyle or getBoundingClientRects on chrome
			setTimeout =>

				@_setUnderlineWidth @titles[0].getSize()
				@_setUnderlinePosition @ribbonBarSpace

			, 400

	moveTo: (index) ->

		@_setUnderlineWidth @titles[index].getSize()
		@_setUnderlinePosition @titles[index].position