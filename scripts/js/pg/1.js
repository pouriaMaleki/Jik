var MainView, Model, Pantomime, mainView, model, t;

Pantomime = require('pantomime');

t = new Pantomime.Touchy(document);

Model = require('../Model/Model');

MainView = require('../View/Main');

model = new Model;

mainView = new MainView(model);

model.getHomeList();

/*
//@ sourceMappingURL=1.map
*/
