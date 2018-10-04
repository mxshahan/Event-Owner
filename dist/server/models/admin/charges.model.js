'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.chargesCrud = exports.chargesModel = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseUniqueValidator = require('mongoose-unique-validator');

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

var _crud = require('../../config/crud');

var _crud2 = _interopRequireDefault(_crud);

var _config = require('../../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chargesSchema = new _mongoose2.default.Schema({
    paypal: {
        type: Number
    },
    credit_card: {
        type: Number
    },
    pepper_pay: {
        type: Number
    },
    bit: {
        type: Number
    },
    paybox: {
        type: Number
    },
    trx_charge: {
        type: Number
    }
});

chargesSchema.plugin(_mongooseUniqueValidator2.default);
chargesSchema.plugin(_mongooseTimestamp2.default);

var chargesModel = _mongoose2.default.model('chargesModel', chargesSchema);
var chargesCrud = new _crud2.default(chargesModel);

exports.chargesModel = chargesModel;
exports.chargesCrud = chargesCrud;