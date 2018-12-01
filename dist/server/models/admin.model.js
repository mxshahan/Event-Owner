'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.adminCrud = exports.adminModel = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseUniqueValidator = require('mongoose-unique-validator');

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

var _bcryptjs = require('bcryptjs');

var _crud = require('../config/crud');

var _crud2 = _interopRequireDefault(_crud);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var adminSchema = new _mongoose2.default.Schema({
    name: {
        type: String
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String
    },
    type: {
        type: String,
        default: 'admin'
    },
    profile_picture: {
        type: String
    },
    charges: {
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'chargesModel'
    },
    terms: {
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'termsModel'
    },
    faq: [{
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'faqModel'
    }],
    categories: [{
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'categoriesModel'
    }],
    mailto: {
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'mailtoModel'
    },
    contact_info: {
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'contactInfoModel'
    }
});

adminSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.password = this._hashPassword(this.password);
        return next();
    }
    return next();
});
adminSchema.methods = {
    _hashPassword: function _hashPassword(password) {
        return (0, _bcryptjs.hashSync)(password);
    },
    isAuthenticated: function isAuthenticated(password) {
        return (0, _bcryptjs.compareSync)(password, this.password);
    },
    createToken: function createToken() {
        return _jsonwebtoken2.default.sign({
            _id: this._id,
            type: this.type,
            username: this.username
        }, _config2.default.secret);
    },
    toAuthJSON: function toAuthJSON() {
        return {
            success: true,
            accType: this.type,
            token: 'JWT ' + this.createToken()
        };
    }
};

adminSchema.plugin(_mongooseUniqueValidator2.default);
adminSchema.plugin(_mongooseTimestamp2.default);

var adminModel = _mongoose2.default.model('adminModel', adminSchema);
var adminCrud = new _crud2.default(adminModel);

exports.adminModel = adminModel;
exports.adminCrud = adminCrud;