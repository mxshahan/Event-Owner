'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mailtoCrud = exports.mailtoModel = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseUniqueValidator = require('mongoose-unique-validator');

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _bcryptjs = require('bcryptjs');

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

var _crud = require('../../config/crud');

var _crud2 = _interopRequireDefault(_crud);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mailtoSchema = new _mongoose2.default.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    active: {
        type: Boolean,
        enum: [true, false]
    },
    host: {
        type: String
    },
    port: {
        type: String
    },
    secure: {
        type: Boolean
    },
    service: {
        type: String
    }
});

mailtoSchema.plugin(_mongooseUniqueValidator2.default);
mailtoSchema.plugin(_mongooseTimestamp2.default);

var mailtoModel = _mongoose2.default.model('mailtoModel', mailtoSchema);
var mailtoCrud = new _crud2.default(mailtoModel);

exports.mailtoModel = mailtoModel;
exports.mailtoCrud = mailtoCrud;