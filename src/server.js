'use strict';

const config = require('./config');
const db = require('./db');

const app = require('express')();
require('./routes')(app);


async function main() {
   try {
      await db.initDB();
   } catch(err) {
      console.log(err);
      process.exit(1);
   }

   app.listen(config.ServerPort, config.ServerAddr, () => {
      console.log('server started');
   });
}

main();
