'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isDev = process.env.NODE_ENV == "development";
var isProd = process.env.NODE_ENV == "production";

// const ENV = "development"

exports.default = function (app) {
    if (isProd) {
        app.use((0, _compression2.default)());
        app.use((0, _helmet2.default)());
    }
    app.use((0, _cors2.default)());
    app.use(_bodyParser2.default.json());
    app.use(_bodyParser2.default.urlencoded({ extended: true }));
    app.use(_passport2.default.initialize());


    //catch 404 Errors and forward them to error handler
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