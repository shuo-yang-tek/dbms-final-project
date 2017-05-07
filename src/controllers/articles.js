'use strict';

const Articles = require('../models/articles');

async function getAll(req, res, next) {
   try {
      const result = await Articles.getAll();
      res.json(result);
   } catch(err) {
      next(err);
   }
}

async function getOne(req, res, next) {
   const id = parseInt(req.params.id);

   if( isNaN(id) ) {
      res.status(403).json({
         message: 'id must be a integer'
      });
      return;
   }

   try {
      const result = await Articles.getOneWithContext(id);
      
      if(!result) {
         res.status(404).json({
            message: 'not found'
         });
      }

      res.json(result);
   } catch(err) {
      next(err);
   }
}

async function insert(req, res, next) {
   if(typeof req.body.title !== 'string' ||
      typeof req.body.context !== 'string' ||
      typeof req.body.author !== 'string')
   {
      res.status(403).json({
         message: 'title, context, author must be strings'
      });
      return;
   }

   try {
      await Articles.insertOne(req.body.title, req.body.context, req.body.author);
      res.json({
         message: 'success'
      });
   } catch(err) {
      next(err);
   }
}

async function update(req, res, next) {
   const id = parseInt(req.params.id);

   if( isNaN(id) ) {
      res.status(403).json({
         message: 'id must be a integer'
      });
      return;
   }

   if(typeof req.body.title !== 'string' ||
      typeof req.body.context !== 'string' ||
      typeof req.body.author !== 'string')
   {
      res.status(403).json({
         message: 'title, body, author must be strings'
      });
      return;
   }

   try {
      await Articles.updateOne(id, req.body.title, req.body.context, req.body.author);
      res.json({
         message: 'success'
      });
   } catch(err) {
      next(err);
   }
}

async function deleteOne(req, res, next) {
   const id = parseInt(req.params.id);

   if(isNaN(id)) {
      res.status(403).json({
         message: 'id must be a integer'
      });
      return;
   }

   try {
      await Articles.deleteOne(id);
      res.json({
         message: 'success'
      });
   } catch(err) {
      next(err);
   }
}

module.exports = {
   getAll,
   getOne,
   insert,
   update,
   deleteOne
};
