'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.withdrawalCrud = exports.withdrawalModel = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

var _crud = require('../config/crud');

var _crud2 = _interopRequireDefault(_crud);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var withdrawalSchema = new _mongoose2.default.Schema({
    amount: {
        type: Number
    },
    approved: {
        type: Boolean,
        enum: [true, false]
    },
    withdrawn_by: {
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'userModel'
    }
});

withdrawalSchema.plugin(_mongooseTimestamp2.default);

var withdrawalModel = _mongoose2.default.model('withdrawalModel', withdrawalSchema);
var withdrawalCrud = new _crud2.default(withdrawalModel);

exports.withdrawalModel = withdrawalModel;
exports.withdrawalCrud = withdrawalCrud;