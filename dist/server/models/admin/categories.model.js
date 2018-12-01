'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.categoriesCrud = exports.categoriesModel = undefined;

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

var categoriesSchema = new _mongoose2.default.Schema({
    name: {
        type: String,
        required: true
    }
});

categoriesSchema.plugin(_mongooseUniqueValidator2.default);
categoriesSchema.plugin(_mongooseTimestamp2.default);

var categoriesModel = _mongoose2.default.model('categoriesModel', categoriesSchema);
var categoriesCrud = new _crud2.default(categoriesModel);

exports.categoriesModel = categoriesModel;
exports.categoriesCrud = categoriesCrud;