'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.schemas = exports.validateBody = exports.validateParam = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateParam = exports.validateParam = function validateParam(schema, name) {
    return function (req, res, next) {
        var result = _joi2.default.validate({ param: req['params'][name] }, schema);
        if (result.error) {
            return res.status(400).json(result.error);
        } else {
            if (!req.value) req.value = {};
            if (!req.value['params']) req.value['params'] = {};

            req.value['params'][name] = result.value.param;
            next();
        }
    };
};

var validateBody = exports.validateBody = function validateBody(schema) {
    return function (req, res, next) {
        var result = _joi2.default.validate(req.body, schema);
        if (result.error) {
            return res.status(400).json(result.error);
        } else {
            if (req.value) {
                return res.status(200).json(result);
            } else {
                req.value = {};
            }
            next();
        }
    };
};

var schemas = exports.schemas = {
    signIn: _joi2.default.object().keys({
        username: _joi2.default.string().required(),
        password: _joi2.default.string().required()
    }),
    signUp: _joi2.default.object().keys({
        username: _joi2.default.string().required(),
        email: _joi2.default.string().email().required(),
        password: _joi2.default.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        firstname: _joi2.default.string().required(),
        lastname: _joi2.default.string().required(),
        phone: _joi2.default.string(),
        personal_id: _joi2.default.string(),
        acc_type: _joi2.default.string(),
        events: _joi2.default.array(),
        gifts: _joi2.default.array()
    }),
    events: _joi2.default.object().keys({
        title: _joi2.default.string().required(),
        type: _joi2.default.string().required(),
        venue: _joi2.default.string().required(),
        date: _joi2.default.string().required(),
        time: _joi2.default.string(),
        description: [_joi2.default.string().optional(), _joi2.default.allow(null)],
        author: _joi2.default.optional(),
        payment: [_joi2.default.array().optional(), _joi2.default.allow(null)],
        files: [_joi2.default.array().optional(), _joi2.default.allow(null)],
        gifts: [_joi2.default.array().optional(), _joi2.default.allow(null)],
        thumbnail: [_joi2.default.string().optional(), _joi2.default.allow(null)],
        qrCode: [_joi2.default.string().optional(), _joi2.default.allow(null)]
    }),
    contact: _joi2.default.object().keys({
        name: _joi2.default.string().required(),
        email: _joi2.default.string().email().required(),
        phone: _joi2.default.string(),
        message: _joi2.default.string().required()
    })
};