'use strict';

const DB = require('../db');

function getAll() {
   return new Promise((resolve, reject) => {
      DB.DB.all('SELECT * FROM Articles', (err, res) => {
         if( err ) {
            reject(err);
            return;
         }

         resolve(res);
      });
   });
}

function getOne(id) {
   return new Promise((resolve, reject) => {
      id = parseInt(id);

      if( isNaN(id) ) {
         reject(new Error('id must be a integer'));
         return;
      }

      DB.DB.get('SELECT * FROM Articles WHERE id = ' + id.toString(), (err, res) => {
         if(err) {
            reject(err);
            return;
         }

         resolve(res);
      });
   });
}

function insertOne(title, context, author) {
   return new Promise((resolve, reject) => {
      if(!(title && context && author)) {
         reject(new Error('title, context, author are required'));
         return;
      }

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
      id = parseInt(id);

      if( isNaN(id) ) {
         reject(new Error('id must be a integer'));
         return;
      }

      if(!(title && context && author)) {
         reject(new Error('title, context, author are required'));
         return;
      }

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
      id = parseInt(id);

      if( isNaN(id) ) {
         reject(new Error('id must be a integer'));
         return;
      }

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
   getOne,
   insertOne,
   updateOne,
   deleteOne
};
