'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.paymentCrud = exports.paymentModel = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

var _crud = require('../config/crud');

var _crud2 = _interopRequireDefault(_crud);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import uniqueValidator from 'mongoose-unique-validator';
var paymentSchema = new _mongoose2.default.Schema({
    name: {
        type: String,
        required: true,
        default: 'No Name'
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    gift_amount: {
        type: Number
    },
    trxid: {
        type: String
    },
    eventId: {
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'eventModel'
    },
    description: {
        type: String
    }
});

// paymentSchema.plugin(uniqueValidator);
paymentSchema.plugin(_mongooseTimestamp2.default);

var paymentModel = _mongoose2.default.model('paymentModel', paymentSchema);
var paymentCrud = new _crud2.default(paymentModel);

exports.paymentModel = paymentModel;
exports.paymentCrud = paymentCrud;