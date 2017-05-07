'use strict';

const DB = require('../db');

function getAll() {
   return new Promise((resolve, reject) => {
      const columns = 'id, author, title, timestamp';

      DB.DB.all('SELECT ' + columns + 
         ' FROM Articles ORDER BY timestamp DESC', (err, res) => {
         if( err ) {
            reject(err);
            return;
         }

         for(const item of res) {
            item.title = decodeURI(item.title);
            item.author = decodeURI(item.author);
         }

         resolve(res);
      });
   });
}

function getOneWithContext(id) {
   return new Promise((resolve, reject) => {
      DB.DB.get('SELECT * FROM Articles WHERE id = ' + id.toString(), (err, res) => {
         if(err) {
            reject(err);
            return;
         }

         if(res) {
            res.title = decodeURI(res.title);
            res.context = decodeURI(res.context);
            res.author = decodeURI(res.author);
         }

         resolve(res);
      });
   });
}

function insertOne(title, context, author) {
   return new Promise((resolve, reject) => {
      title = encodeURI(title);
      context = encodeURI(context);
      author = encodeURI(author);

      const Columns = '(title, context, author, timestamp)';
      const Values = 
         '(' +
         '"' + title + '",' +
         '"' + context + '",' +
         '"' + author + '",' +
         Date.now() + ')';

      DB.DB.run('INSERT INTO Articles ' + Columns + ' VALUES ' + Values, (err) => {
         if( err ) {
            reject(err);
            return;
         }

         resolve();
      });
   });
}

function updateOne(id, title, context, author) {
   return new Promise((resolve, reject) => {
      title = encodeURI(title);
      context = encodeURI(context);
      author = encodeURI(author);

      const Updates = 
         'title = "' + title + '",' +
         'context = "' + context + '",' +
         'author = "' + author + '"';

      DB.DB.run('UPDATE Articles SET ' + Updates + ' WHERE id = ' + id, (err) => {
         if(err) {
            reject(err);
            return;
         }

         resolve();
      });
   });
}

function deleteOne(id) {
   return new Promise((resolve, reject) => {
      DB.DB.run('DELETE FROM Articles WHERE id = ' + id, (err) => {
         if( err ) {
            reject(err);
            return;
         }

         resolve();
      });
   });
}

module.exports = {
   getAll,
   getOneWithContext,
   insertOne,
   updateOne,
   deleteOne
};
