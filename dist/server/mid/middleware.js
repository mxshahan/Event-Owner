'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _expressFileupload = require('express-fileupload');

var _expressFileupload2 = _interopRequireDefault(_expressFileupload);

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var env = process.env.NODE_ENV;

// const ENV = "development"

// import session from 'express-session';
var corsOption = {
    origin: function origin(_origin, callback) {
        _config2.default.FRONTEND_URL.indexOf(_origin) !== -1 ? callback(null, true) : callback(new Error('Not allowed by CORS'));
    }
};

exports.default = function (app) {
    if (env.includes('production')) {
        app.use((0, _compression2.default)());
        app.use((0, _helmet2.default)());
        app.set('trust proxy', 1); // trust first proxy
        // app.use(session({
        //   secret: 's3Cur33D',
        //   name: 'sessionId'
        // }))
    }
    app.use((0, _cors2.default)(corsOption));
    app.use(_bodyParser2.default.json());
    app.use(_bodyParser2.default.urlencoded({ extended: true }));
    app.use((0, _expressFileupload2.default)());
    // app.use(passport.initialize());
    if (env.includes('development')) {
        app.use((0, _morgan2.default)('dev'));
    }
};