'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.eventCrud = exports.eventModel = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

var _crud = require('../config/crud');

var _crud2 = _interopRequireDefault(_crud);

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var eventSchema = new _mongoose2.default.Schema({
    title: {
        type: String,
        required: true,
        default: 'No Title'
    },
    type: {
        type: String,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    payment: [{
        type: String
    }],
    author: {
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'userModel'
    },
    thumbnail: {
        type: String
    },
    files: [{
        type: String
    }],
    gifts: [{
        type: Number
    }]
});

// eventSchema.plugin(uniqueValidator);

// import uniqueValidator from 'mongoose-unique-validator';
eventSchema.plugin(_mongooseTimestamp2.default);

var eventModel = _mongoose2.default.model('eventModel', eventSchema);
var eventCrud = new _crud2.default(eventModel);

exports.eventModel = eventModel;
exports.eventCrud = eventCrud;