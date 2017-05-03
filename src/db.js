'use strict';

const sqlite3 = require('sqlite3');

module.exports = {
   initDB: () => {
      return new Promise((resolve, reject) => {
         const db = new sqlite3.Database(':memory:', (err) => {
            if( err ) {
               reject(err);
               return;
            }

            const Schema = 
               '(' + 
               'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
               'author TEXT,' +
               'title TEXT,' +
               'context TEXT,' +
               'timestamp INTEGER' +
               ')';

            db.run('CREATE TABLE Articles' + Schema, (err) => {
               if( err ) {
                  reject(err);
                  return;
               }

               module.exports.DB = db;
               resolve();
            });
         });
      });
   }
};
