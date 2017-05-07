'use strict';

const path = require('path');
const fs = require('fs');
const pug = require('pug');
const babelCore = require('babel-core');

const indexPugFilename = path.join(__dirname, '../assets/pugs/index.pug');
let pugRendered;

const mainScriptFilename = path.join(__dirname, '../assets/scripts/main.js');
let scriptRendered;

function renderPug() {
   pugRendered = {
      mtime: fs.statSync(indexPugFilename).mtime,
      html: pug.renderFile(indexPugFilename)
   };
}

function html(req, res) {
   if( !pugRendered )
      renderPug();
   else if(pugRendered.mtime !== fs.statSync(indexPugFilename).mtime)
      renderPug();

   res.type('html').end(pugRendered.html);
}

function renderScript() {
   scriptRendered = {
      mtime: fs.statSync(mainScriptFilename).mtime,
      code: babelCore.transformFileSync(mainScriptFilename, {
         presets: ['es2015', 'stage-0'],
         sourceMaps: 'inline'
      }).code
   };
}

function script(req, res) {
   if( !scriptRendered )
      renderScript();
   else if(scriptRendered.mtime !== fs.statSync(mainScriptFilename).mtime)
      renderScript();

   res.end(scriptRendered.code);
}

module.exports = {
   html,
   script
};
