Foxie = require 'Foxie'
Lyric = require './MusicPlayer/Lyric'
Seekbar = require './MusicPlayer/Seekbar'

module.exports = class MusicPlayer

	constructor: (@mainView) ->

		@transTime = 700
		@showing = false

		@height = window.innerHeight

		@el = Foxie '.musicplayer'
		.moveYTo @height
		.trans @transTime
		.perspective 4000
		.putIn document.body

		lock = false

		elHammer = new Hammer @el.node
		elHammer.on 'panup', (arg) => do @show unless @showing
		elHammer.on 'pandown', (arg) =>

			if arg.srcEvent.target isnt @el.node

				lock = true
				return

			return if lock

			do @hide

		elHammer.on 'panend', (arg) =>

			lock = false

		@playTop = Foxie '.musicplayer-button.musicplayer-playtop'
		.trans 500
		.putIn @el

		playTopHammer = new Hammer @playTop.node
		playTopHammer.on 'tap', (arg) => @mainView.model.musicPlayer.toggle() unless @showing

		@posterTop = Foxie 'img.musicplayer-postertop'
		.attr 'draggable', 'false'
		.setOpacity 0
		.trans 500
		.putIn @el

		@hideBtn = Foxie '.musicplayer-button.musicplayer-hide'
		.trans 500
		.putIn @el

		@songName = Foxie '.musicplayer-songname'
		.putIn @el

		@artist = Foxie '.musicplayer-artist'
		.putIn @el

		@posterContainer = Foxie '.musicplayer-poster'
		.putIn @el

		@poster = Foxie 'img'
		.attr 'draggable', 'false'
		.putIn @posterContainer

		@lyric = new Lyric @posterContainer, @mainView.model.musicPlayer
		@seekbar = new Seekbar @el, @mainView.model.musicPlayer

		@buttons = Foxie '.musicplayer-buttons'
		.putIn @el

		@add = Foxie '.musicplayer-button.musicplayer-add'
		.putIn @buttons

		@prev = Foxie '.musicplayer-button.musicplayer-prev'
		.putIn @buttons

		@play = Foxie '.musicplayer-button.musicplayer-play'
		.putIn @buttons

		@next = Foxie '.musicplayer-button.musicplayer-next'
		.putIn @buttons

		@fav = Foxie '.musicplayer-button.musicplayer-fav'
		.putIn @buttons

		window.addEventListener 'resize', (event) =>

			@height = window.innerHeight

			do @lyric.updateScrollSize

			do @forceHide unless @showing

			return

		playHammer = new Hammer @play.node
		playHammer.on 'tap', (arg) => @mainView.model.musicPlayer.toggle()

		favHammer = new Hammer @fav.node
		favHammer.on 'tap', (arg) => @mainView.model.musicPlayer.fav()

		addHammer = new Hammer @add.node
		addHammer.on 'tap', (arg) => @mainView.model.page.showSelector()

		hideBtnHammer = new Hammer @hideBtn.node
		hideBtnHammer.on 'tap', (arg) =>

			if @showing

				do @hide

			else

				if @mainView.model.musicPlayer.playing

					do @show

				else

					do @hide


		@mainView.model.musicPlayer.on 'show-player', => @show()

		@mainView.model.musicPlayer.on 'play-music', (data) => @show(data)

		@mainView.model.musicPlayer.on 'music-pause', =>

			@play.node.classList.add 'musicplayer-pause'
			@playTop.node.classList.add 'musicplayer-pausetop'

			return

		@mainView.model.musicPlayer.on 'music-unpause', =>

			@play.node.classList.remove 'musicplayer-pause'
			@playTop.node.classList.remove 'musicplayer-pausetop'

			return

		@mainView.model.musicPlayer.on 'music-more-detail', (data) =>

			@lyric.text data.lyric

			do @lyric.updateScrollSize

			return

		@mainView.model.musicPlayer.on 'song-fav', (data) =>

			@fav.node.classList.remove 'musicplayer-fav'
			@fav.node.classList.add 'musicplayer-faved'

		@mainView.model.musicPlayer.on 'song-unfav', (data) =>

			@fav.node.classList.remove 'musicplayer-faved'
			@fav.node.classList.add 'musicplayer-fav'

	show: (data) ->

		return if @mainView.model.musicPlayer.seeking

		@mainView.model.page.hideSelector()

		@showing = true

		@el
		.moveYTo 0

		@playTop
		.setOpacity 0

		@posterTop
		.setOpacity 0

		@hideBtn
		.setOpacity 1

		return unless data?

		@songName
		.innerHTML data.songname

		@artist
		.innerHTML data.artist

		@poster
		.attr 'src', data.poster_big

		@posterTop
		.attr 'src', data.poster

	hide: ->

		return if @mainView.model.musicPlayer.seeking

		@mainView.model.page.hideSelector()

		@showing = false

		if @mainView.model.musicPlayer.playing

			@el.moveYTo @height - 50

		else

			@el.moveYTo @height

		@playTop
		.setOpacity 1

		@posterTop
		.setOpacity 1

		@hideBtn
		.setOpacity 0

	forceHide: ->

		@showing = false

		if @mainView.model.musicPlayer.playing

			@el
			.noTrans()
			.moveYTo @height - 50
			.trans @transTime

		else

			@el
			.noTrans()
			.moveYTo @height
			.trans @transTime


		@playTop
		.setOpacity 1

		@posterTop
		.setOpacity 1

		@hideBtn
		.setOpacity 0