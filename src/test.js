'use strict';

const DB = require('./db');
const Articles = require('./models/articles');

async function test() {
   await DB.initDB();

   for(let i = 0; i < 10; i++) {
      try {
         await Articles.insertOne('title' + i, 'context' + i, 'author' + i);
      } catch(err) {
         console.log(err);
         return;
      }
   }

   await Articles.deleteOne(4);

   console.log(await Articles.getAll());

}

test();
