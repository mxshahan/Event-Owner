'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.contactInfoCrud = exports.contactInfoModel = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

var _crud = require('../../config/crud');

var _crud2 = _interopRequireDefault(_crud);

var _config = require('../../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var contactInfoSchema = new _mongoose2.default.Schema({
    description: {
        type: String
    },
    iframe: {
        type: String
    },
    message: {
        type: String
    },
    address: {
        type: String
    }
});

var contactInfoModel = _mongoose2.default.model('contactInfoModel', contactInfoSchema);
var contactInfoCrud = new _crud2.default(contactInfoModel);

exports.contactInfoModel = contactInfoModel;
exports.contactInfoCrud = contactInfoCrud;