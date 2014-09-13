Foxie = require 'Foxie'
SimpleSong = require '../SimpleSong'
Item = require '../Item'

module.exports = class AlbumItem extends Item

	constructor: (@mainView, @parentNode, @page, data, @count) ->

		super

		@title1
		.innerHTML data.album

		@title2
		.innerHTML data.artist

		@plusBtn = Foxie '.album-plus'
		.putIn @el

		plusHammer = new Hammer @plusBtn.node
		plusHammer.on 'tap', (arg) =>

			do @songs[0].play

			for song in @songs

				do song.addToNowPlaying

		@hammer.on 'tap', =>

			@mainView.model.albumDetail.toggleDetail(data.id)

			return

		@mainView.model.albumDetail.on 'detail-show', (id) =>

			return if id isnt data.id

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

		if data.albumtracks?

			for song in data.albumtracks

				@createSong song

			# if @mainView.model.data.detail is data.id

			# 	@el.setHeight @songs.length * 50 + 75

			# 	do @page.updateSize

	createSong: (data) ->

		song = new SimpleSong @mainView, @el, data

		@songs.push song