Foxie = require 'Foxie'
SimpleSong = require '../SimpleSong'
Item = require '../Item'

module.exports = class AlbumItem extends Item

	constructor: (@mainView, @parentNode, @page, data, @count) ->

		super

		Foxie '.album-icon'
		.putIn @titlesContainer

		@detailNotLoaded = Foxie '.simple-songname'
		.innerHTML 'Loading Album'
		.moveYTo 85
		.putIn @el

		@detailsLoaded = no

		@title1
		.innerHTML data.album

		@hammer.on 'tap', =>

			if @detailsLoaded is no

				@mainView.model.albumDetail.loadDetail(data.id)

			@mainView.model.albumDetail.toggleDetail(data.id)

			return

		@mainView.model.albumDetail.on 'details', (albumDetail) =>

			return if albumDetail.id isnt data.id

			@detailsLoaded = yes

			@el.node.removeChild @detailNotLoaded.node

			for song in albumDetail.songs

				@createSong song

			if @mainView.model.albumDetail.detail is data.id

				@el.setHeight @songs.length * 50 + 75

				do @page.updateSize

			return

		@mainView.model.albumDetail.on 'detail-show', (id) =>

			return if id isnt data.id

			if @detailsLoaded is no

				@el.setHeight 120

			else

				@el.setHeight @songs.length * 50 + 75

			do @page.updateSize

			@page.scrollToItem @count

			return

		@mainView.model.albumDetail.on 'detail-close', (id) =>

			return if id isnt data.id

			@el.setHeight 75

			do @page.updateSize

			return

		@songs = []

	createSong: (data) ->

		song = new SimpleSong @mainView, @el, data
		@songs.push song