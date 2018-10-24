'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.balanceCrud = exports.balanceModel = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseUniqueValidator = require('mongoose-unique-validator');

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

var _crud = require('../config/crud');

var _crud2 = _interopRequireDefault(_crud);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var balanceSchema = new _mongoose2.default.Schema({
    pending_balance: {
        type: String
    },
    total_balance: {
        type: String
    }
});

adminSchema.plugin(_mongooseTimestamp2.default);

var balanceModel = _mongoose2.default.model('balanceModel', balanceSchema);
var balanceCrud = new _crud2.default(balanceModel);

exports.balanceModel = balanceModel;
exports.balanceCrud = balanceCrud;