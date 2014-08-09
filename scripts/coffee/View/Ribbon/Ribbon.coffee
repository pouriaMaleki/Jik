Foxie = require 'foxie'
Title = require './Title'
Pantomime = require 'pantomime'
RibbonPage = require './RibbonPage'
module.exports = class Ribbon

	constructor: (@rootView, @t) ->

		@width = window.innerWidth
		@ribbonBarSpace = 20

		@el = Foxie '.ribbon'
		.moveZTo 150
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

		for title in @titles

			do title.inactive

		do @titles[index].active

		@rootView.bg.moveXTo index * -100 - 200

	getPage: (index) ->

		@pages[index].el

	addTitle: (title) ->

		tit = new Title @el, title

		num = @titles.length

		do (num) =>

			hammer = new Hammer tit.el.node

			hammer.on 'tap', (arg) =>

				console.log num

				@rootView.model.page.activeTitle num

			return

		@titles.push tit