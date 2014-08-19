Foxie = require 'Foxie'
Item = require '../Item'

module.exports = class AlbumItem extends Item

	constructor: (@mainView, @parentNode, @page, data) ->

		super

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

				@el.setHeight @songs.length * 30 + 75

				do @page.updateSize

			return

		@mainView.model.albumDetail.on 'detail-show', (id) =>

			return if id isnt data.id

			if @detailsLoaded is no

				@el.setHeight 120

			else

				@el.setHeight @songs.length * 30 + 75

			do @page.updateSize

			return

		@mainView.model.albumDetail.on 'detail-close', (id) =>

			return if id isnt data.id

			@el.setHeight 75

			do @page.updateSize

			return

		@songs = []

	createSong: (data) ->

		song = Foxie '.simple-songname'
		.innerHTML data
		.moveYTo 85
		.putIn @el

		@songs.push song