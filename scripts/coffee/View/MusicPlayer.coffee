Foxie = require 'Foxie'

module.exports = class MusicPlayer

	constructor: (@mainView) ->

		@transTime = 700

		@height = window.innerHeight

		@showing = false

		@el = Foxie '.musicplayer'
		.moveZTo 500
		.moveYTo @height
		.trans @transTime
		.perspective 4000
		.putIn @mainView.el

		@hideBtn = Foxie '.musicplayer-hide'
		.putIn @el

		@songName = Foxie '.musicplayer-songname'
		.putIn @el

		@artist = Foxie '.musicplayer-artist'
		.putIn @el

		@poster = Foxie 'img.musicplayer-poster'
		.putIn @el

		@buttons = Foxie '.musicplayer-buttons'
		.putIn @el

		@prev = Foxie '.musicplayer-prev'
		.putIn @buttons

		@play = Foxie '.musicplayer-play'
		.putIn @buttons

		@next = Foxie '.musicplayer-next'
		.putIn @buttons


		window.addEventListener 'resize', (event) =>

			@height = window.innerHeight

			do @forceHide unless @showing

			return


		playHammer = new Hammer @play.node

		playHammer.on 'tap', (arg) =>

			@mainView.model.musicPlayer.toggle()

		hideBtnHammer = new Hammer @hideBtn.node

		hideBtnHammer.on 'tap', (arg) =>

			@hide()

		@mainView.model.musicPlayer.on 'show-player', =>

			@show()

			return

		@mainView.model.musicPlayer.on 'play-music', (data) =>

			@show(data)

			return

		@mainView.model.musicPlayer.on 'music-pause', =>

			@play.node.classList.add 'musicplayer-pause'

			return

		@mainView.model.musicPlayer.on 'music-unpause', =>

			@play.node.classList.remove 'musicplayer-pause'

			return


	show: (data) ->

		@showing = true

		@el
		.moveYTo 0

		return if data is null

		@songName
		.innerHTML data.songname

		@artist
		.innerHTML data.artist

		@poster
		.attr 'src', data.poster_big

	hide: ->

		@showing = false

		@el
		.moveYTo @height

	forceHide: ->

		@showing = false

		@el
		.noTrans()
		.moveYTo @height
		.trans @transTime