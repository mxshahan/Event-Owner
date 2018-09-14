'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _middleware = require('./mid/middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _errorHandler = require('./mid/errorHandler');

var _errorHandler2 = _interopRequireDefault(_errorHandler);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _expressHistoryApiFallback = require('express-history-api-fallback');

var _expressHistoryApiFallback2 = _interopRequireDefault(_expressHistoryApiFallback);

require('./config/db');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import dbCreate from './config/create';
var port = process.env.PORT || 3000;
var app = (0, _express2.default)();

var clientPath = _path2.default.resolve(__dirname, '../../dist/client');
var publicPath = _path2.default.resolve(__dirname, '../../public');

app.use(_express2.default.static(publicPath));
app.set('env', process.env.NODE_ENV);

// Middlewares
(0, _middleware2.default)(app);
// Api Router
(0, _routes2.default)(app);
// Error Handler
// errorHandler(app);

// Static Director
app.use('/client', _express2.default.static(clientPath));
app.use((0, _expressHistoryApiFallback2.default)('index.html', { root: publicPath }));

app.listen(port, function (err, next) {
  if (err) throw err;
  console.log('Server running at port: ' + port);
});