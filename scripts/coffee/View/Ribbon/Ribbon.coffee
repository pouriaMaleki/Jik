Foxie = require 'foxie'
Title = require './Title'
RibbonPage = require './RibbonPage'
module.exports = class Ribbon

	constructor: (@rootView, @t) ->

		@width = window.innerWidth
		@ribbonBarSpace = 20

		@el = Foxie '.ribbon'
		.putIn @rootView.el

		line = Foxie '.ribbon-line'
		.putIn @el

		@underLine = Foxie '.ribbon-underline'
		.putIn @el

		@titles = []
		@pages = []

		for title, i in @t

			@addTitle title

			@pages.push new RibbonPage @rootView, (i * @width), i

		@rootView.model.page.on 'page-active', (num) =>

			@showPage num

		window.addEventListener 'resize', =>

			@width = window.innerWidth

			for page, i in @pages

				page.moveTo i * @width

			do @rootView.model.page.activeTitle

		do @rootView.model.page.activeTitle

	showPage: (index) ->

		@rootView.inside
		.trans 700
		.moveXTo index * (-1 * @width)

		for title, i in @titles

			if i < index

				title.moveTo -200

			else if i is index + 1

				title.moveTo @width - title.getWidth() + 10

			else if i > index + 1

				title.moveTo @width

			else

				title.moveTo 0

		@rootView.bg.moveXTo index * -100 - 200

	getPage: (index) ->

		@pages[index].el

	addTitle: (title) ->

		tit = new Title @el, title, @width

		@titles.push tit