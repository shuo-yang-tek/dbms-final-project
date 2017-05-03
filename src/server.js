'use strict';

async function aaa() {
   await require('./db').initDB();
   console.log('success');
}

aaa();
