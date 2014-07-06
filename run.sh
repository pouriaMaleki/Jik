#!/bin/bash

(cd ~/workspace/jik/scripts && jitter coffee js -bm) &
(cd ~/workspace/jik/scripts && watchify js/pg/pg.js --path js --noparse=FILE --dg false -s pg -o dist/pg.js) &
(cd ~/workspace/jik/styles && compass watch) &
(cd ~/workspace/jik && nodemon)