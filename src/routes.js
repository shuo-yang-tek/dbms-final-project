'use strict';

const bodyParser = require('body-parser');

const Articles = require('./controllers/articles');
const Assets = require('./controllers/assets');
const middlewares = require('./controllers/middlewares');

module.exports = (app) => {
   app.use(bodyParser.json());

   app.get('/articles', Articles.getAll);
   app.get('/articles/:id', Articles.getOne);
   app.post('/articles', Articles.insert);
   app.put('/articles/:id', Articles.update);
   app.delete('/articles/:id', Articles.deleteOne);

   app.get('/*.js', Assets.script);
   app.use('*', Assets.html);

   app.use(middlewares.errorHandler);
};
