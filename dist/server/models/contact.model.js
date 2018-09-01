'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.contactCrud = exports.contactModel = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

var _crud = require('../config/crud');

var _crud2 = _interopRequireDefault(_crud);

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var contactSchema = new _mongoose2.default.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    message: {
        type: String,
        required: true
    }
});

// contactSchema.plugin(uniqueValidator);

// import uniqueValidator from 'mongoose-unique-validator';
contactSchema.plugin(_mongooseTimestamp2.default);

var contactModel = _mongoose2.default.model('contactModel', contactSchema);
var contactCrud = new _crud2.default(contactModel);

exports.contactModel = contactModel;
exports.contactCrud = contactCrud;