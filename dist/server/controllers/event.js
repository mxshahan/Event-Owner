'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fileUploadEvent = exports.getSingleEvent = exports.getEventByType = exports.getEvent = exports.deleteEvent = exports.updateEvent = exports.createEvent = exports.getAllEvent = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _event = require('../models/event.model');

var _user = require('../models/user.model');

var _file = require('../mid/file');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Global Variables
var events = void 0;

// Demo
// export const Demo = async (req, res) => {

// }

// This Controller Should Block After Development for Security purpose
var getAllEvent = exports.getAllEvent = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return _event.eventCrud.get({
                            select: '',
                            populate: 'gifts'
                        });

                    case 3:
                        events = _context.sent;

                        res.status(200).json(events);
                        _context.next = 10;
                        break;

                    case 7:
                        _context.prev = 7;
                        _context.t0 = _context['catch'](0);

                        res.status(400).json(_context.t0);

                    case 10:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 7]]);
    }));

    return function getAllEvent(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

// Event Create
var createEvent = exports.createEvent = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
        var data, user;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        data = _extends(req.body, {
                            author: req.user._id
                        });
                        _context2.prev = 1;
                        _context2.next = 4;
                        return _event.eventCrud.create(data);

                    case 4:
                        events = _context2.sent;
                        _context2.next = 7;
                        return _user.userModel.findOne({ _id: data.author });

                    case 7:
                        user = _context2.sent;

                        user.events.push(events);
                        user.save();
                        res.status(201).json(events);
                        _context2.next = 16;
                        break;

                    case 13:
                        _context2.prev = 13;
                        _context2.t0 = _context2['catch'](1);

                        res.status(500).json({
                            message: 'Please Validate Data',
                            error: _context2.t0
                        });

                    case 16:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[1, 13]]);
    }));

    return function createEvent(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

// Event Update
var updateEvent = exports.updateEvent = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;
                        _context3.next = 3;
                        return _event.eventCrud.put({
                            params: {
                                qr: {
                                    _id: req.params.id,
                                    author: req.user._id
                                }
                            },
                            body: req.body
                        });

                    case 3:
                        events = _context3.sent;

                        res.status(201).json(events);
                        _context3.next = 10;
                        break;

                    case 7:
                        _context3.prev = 7;
                        _context3.t0 = _context3['catch'](0);

                        res.status(422).json({
                            success: false
                        });

                    case 10:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[0, 7]]);
    }));

    return function updateEvent(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

// Event Delete
var deleteEvent = exports.deleteEvent = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.prev = 0;

                        if (!(req.user.type === 'admin')) {
                            _context4.next = 7;
                            break;
                        }

                        _context4.next = 4;
                        return _event.eventCrud.delete({
                            params: {
                                qr: { _id: req.params.id }
                            }
                        });

                    case 4:
                        events = _context4.sent;
                        _context4.next = 10;
                        break;

                    case 7:
                        _context4.next = 9;
                        return _event.eventCrud.delete({
                            params: {
                                qr: {
                                    _id: req.params.id,
                                    author: req.user._id
                                }
                            }
                        });

                    case 9:
                        events = _context4.sent;

                    case 10:
                        _context4.next = 12;
                        return (0, _file.fileDelete)(events.thumbnail);

                    case 12:
                        res.status(201).json({
                            success: true
                        });
                        _context4.next = 18;
                        break;

                    case 15:
                        _context4.prev = 15;
                        _context4.t0 = _context4['catch'](0);

                        res.status(422).json({
                            success: false
                        });

                    case 18:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined, [[0, 15]]);
    }));

    return function deleteEvent(_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();

// Get My Event
var getEvent = exports.getEvent = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
        return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.prev = 0;
                        _context5.next = 3;
                        return _event.eventCrud.get({
                            qr: {
                                author: req.user._id
                            },
                            populate: 'gifts'
                        });

                    case 3:
                        events = _context5.sent;

                        res.status(201).json(events);
                        _context5.next = 10;
                        break;

                    case 7:
                        _context5.prev = 7;
                        _context5.t0 = _context5['catch'](0);

                        res.status(422).json({
                            success: false
                        });

                    case 10:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined, [[0, 7]]);
    }));

    return function getEvent(_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
}();

// Get My Event By Type
var getEventByType = exports.getEventByType = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res) {
        return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        console.log(req.headers.type);
                        _context6.prev = 1;
                        _context6.next = 4;
                        return _event.eventCrud.get({
                            qr: {
                                author: req.user._id,
                                type: req.headers.type
                            },
                            populate: 'gifts'
                        });

                    case 4:
                        events = _context6.sent;

                        res.status(201).json(events);
                        _context6.next = 11;
                        break;

                    case 8:
                        _context6.prev = 8;
                        _context6.t0 = _context6['catch'](1);

                        res.status(422).json({
                            success: false
                        });

                    case 11:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined, [[1, 8]]);
    }));

    return function getEventByType(_x11, _x12) {
        return _ref6.apply(this, arguments);
    };
}();

var getSingleEvent = exports.getSingleEvent = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee7(req, res) {
        return _regenerator2.default.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        _context7.prev = 0;
                        _context7.next = 3;
                        return _event.eventCrud.single({
                            qr: {
                                _id: req.params.id
                            },
                            populate: {
                                path: 'author',
                                select: '-password -_id -email'
                            }
                        });

                    case 3:
                        events = _context7.sent;

                        res.status(201).json(events);
                        _context7.next = 10;
                        break;

                    case 7:
                        _context7.prev = 7;
                        _context7.t0 = _context7['catch'](0);

                        res.status(422).json({
                            success: false
                        });

                    case 10:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, undefined, [[0, 7]]);
    }));

    return function getSingleEvent(_x13, _x14) {
        return _ref7.apply(this, arguments);
    };
}();

var fileUploadEvent = exports.fileUploadEvent = function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee8(req, res) {
        return _regenerator2.default.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        console.log(req.filePath);
                        res.status(201).json({
                            thumbnail: req.filename,
                            filePath: req.filePath
                        });

                    case 2:
                    case 'end':
                        return _context8.stop();
                }
            }
        }, _callee8, undefined);
    }));

    return function fileUploadEvent(_x15, _x16) {
        return _ref8.apply(this, arguments);
    };
}();

// const postStripeCharge = res => (stripeErr, stripeRes) => {
//   if (stripeErr) {
//     res.status(500).send({ error: stripeErr });
//   } else {
//     res.status(200).send({ success: stripeRes });
//   }
// }