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

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

require('./config/db');

var _openClearingForm = require('./mid/openClearingForm');

var _openClearingForm2 = _interopRequireDefault(_openClearingForm);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || 3000;
var app = (0, _express2.default)();

// Static Paths
var clientPath = _path2.default.resolve(__dirname, '../../dist/client');
var publicPath = _path2.default.resolve(__dirname, '../../public');

// Development
// import webpack from 'webpack';
// import webpackDevMiddleware from 'webpack-dev-middleware';
// import webpackHotMiddleware from 'webpack-hot-middleware';
// import webpackConfig from '../../webpack.dev.js';

// const compiler = webpack(webpackConfig);

// app.use(webpackDevMiddleware(compiler, webpackConfig.devServer))
// app.use(webpackHotMiddleware(compiler))

var certConfig = {
  key: _fs2.default.readFileSync(_path2.default.resolve(__dirname, '../../dev.deliciousbrains.com.key')),
  cert: _fs2.default.readFileSync(_path2.default.resolve(__dirname, '../../dev.deliciousbrains.com.crt'))
};

// Middlewares
(0, _middleware2.default)(app);
// Api Router
(0, _routes2.default)(app);

// Open Clearing Form and Invoice
app.use('/api', _openClearingForm2.default);

// Error Handler
// errorHandler(app);

app.use(_express2.default.static(publicPath));
app.set('env', process.env.NODE_ENV);

// Static Director
app.use('/client', _express2.default.static(clientPath));
app.use((0, _expressHistoryApiFallback2.default)('index.html', { root: publicPath }));

//set up templete engine
app.set('view engine', 'ejs');
app.set('views', publicPath + '/views');

app.listen(port, function (err, next) {
  if (err) throw err;
  console.log('Server running at port: ' + port);
});
var sslport = 8085;
_https2.default.createServer(certConfig, app).listen(sslport, function (err, next) {
  if (err) throw err;
  console.log('secured server running at port: ' + sslport);
});