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

			for title in @titles

				title.width = @width

			@showPage @rootView.model.page.currentActive

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

				do title.hideToLeft

			else if i is index + 1

				do title.nextIam

			else if i > index + 1

				do title.hideToRight

			else

				do title.show

		@rootView.bg.moveXTo index * -100 - 200

	getPage: (index) ->

		@pages[index].el

	getSubnameSelector: (index) ->

		@titles[index].getSubnameSelector()

	addTitle: (title) ->

		tit = new Title @rootView, @el, title, @width

		@titles.push tit