Pantomime = require 'pantomime'
t = new Pantomime.Touchy document


Model = require '../Model/Model'
MainView = require '../View/Main'

model = new Model
mainView = new MainView model

# Scrollable = require './View/scroll/scrollable'

# @scroll = new Scrollable document.body

# @scroll.forceCalculated(1000)


# window.addEventListener 'error', (e) =>

# 	alert e.toString()


# try

# 	v = document.createElement 'audio'
# 	v.src = './1.mp3'
# 	document.body.appendChild v
# 	v.play()

# 	document.body.addEventListener 'touchstart', ->

# 		v.pause()
# 		v.src = './2.mp3'
# 		v.play()


# catch e

# 	alert e.toString()