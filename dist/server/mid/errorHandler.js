'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (app) {
  //catch 404 Errors and forward them to error handler
  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  app.use(function (err, req, res, next) {
    var error = app.get('env') === 'development' ? err : {};
    var status = err.status || 500;
    //Respond to client
    res.status(status).json({
      error: {
        message: error.message
      }
    });
    //Respond to ourselves
    console.error(err);
  });
};