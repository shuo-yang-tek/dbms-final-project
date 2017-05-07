'use strict';

function errorHandler(err, req, res, next) {
   res.status(500).json({
      err
   });
}

module.exports = {
   errorHandler
};
