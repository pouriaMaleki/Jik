Jik

Listen and Download Persian Music Via Phone

(Work in progress)
(Maybe change of product license in first version)

Project State:

 # App structure

 + Model-View Architecture
 + Smooth animations
 + Non-native scroll
 - Touch gestures
 - Pull-up refresh
 - Load-more end of screen
 - Download music
 - Load local musics
 - Play locally downloaded musics (Avoid buffer again)
 . Design (iOS7ish style)
 . Design tabs
 . Design sub-tabs


 # Music Player

 + Minimum player
 - Minimum playlist
 - Show seekbar
 - Play queue (side)
 - Next-prev button
 - Add to playlist
 - Favorite music
 - Subtitle


 # Playlists

 - Playlist order
 - Define playlists
 - Sync with server


 # Video Player

 - Minimum player
 - Show seekbar
 - Flip fullscreen


 # Home Panel

 - Design
 - Sub-tabs (New, Trending, Feutered)


 # Artist Panel

 - Design
 - Sub-tabs (A-Z, Top, Folowing)
 - Follow sync with server lazy


 # Videos Panel

 - Design


 # Search Area

 - Design
 - Advanced (Lyric, Song, Album, Artist)
 - Fuzzy search local results


 # Setting

 - Account
 - Quality


 # Login, Register

 - With FB
 - With Email
 - Design


Development Guide:

	windows:

		1, install nodeJs
		2, run `npm install -g jitter`
		3, run `npm install -g coffee-script`
		4, run `npm install -g watchify`
		5, run `npm install` in `[clonedFolder]`
		5, run `./scripts/dist_watch.bat` for seprated js files or `./scripts/pg_watch.bat` for watching and making pg.js file (the file that included in `./index.html`)
		6, install ruby
		7, run `gem install compass`
		8, run `./styles/watch.bat` for watchig sass files and compile them to css

	linux:

		1, install nodeJs
		2, run `npm install -g jitter`
		3, run `npm install -g coffee-script`
		4, run `npm install -g watchify`
		5, run `npm install` in `[clonedFolder]`
		6, install ruby
		7, run `gem install compass`
		8, in `[ClonedFolder]` run `sh run.bat`