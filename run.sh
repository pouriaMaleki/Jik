#!/bin/bash

(cd ~/Jik/scripts && jitter coffee js -bm) &
(cd ~/Jik/scripts && watchify js/pg/pg.js --path js --noparse=FILE --dg false -s pg -o dist/pg.js) &
(cd ~/Jik/styles && compass watch) &
(cd ~/Jik && nodemon)