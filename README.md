Jik

Listen and Download Persian Music Via Phone

(Work in progress)
(Maybe change of product license in first version)



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