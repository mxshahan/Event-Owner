'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateFAQ = exports.createFAQ = exports.deleteFAQ = exports.getFAQ = exports.updateTerms = exports.getTerms = exports.updateCharges = exports.getCharges = exports.updateMailTo = exports.getMailTo = exports.updateContactInfo = exports.getContactInfo = exports.updateAdmin = exports.createAdmin = exports.loginAdmin = exports.getAdminData = exports.getAdmin = exports.getAllAdmin = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _admin = require('../models/admin.model');

var _contactinfo = require('../models/admin/contactinfo.model');

var _mailto = require('../models/admin/mailto.model');

var _charges = require('../models/admin/charges.model');

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

var _terms = require('../models/admin/terms.model');

var _faq = require('../models/admin/faq.model');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var user = void 0;

var getAllAdmin = exports.getAllAdmin = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return _admin.adminCrud.get();

                    case 3:
                        user = _context.sent;

                        res.status(200).json(user);
                        _context.next = 10;
                        break;

                    case 7:
                        _context.prev = 7;
                        _context.t0 = _context['catch'](0);

                        res.stauts(422).json(_context.t0);

                    case 10:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 7]]);
    }));

    return function getAllAdmin(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

// Get Admin and Send it to createAdmin
var getAdmin = exports.getAdmin = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res, next) {
        var lnt;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return _admin.adminModel.countDocuments();

                    case 3:
                        lnt = _context2.sent;

                        // user = await adminCrud.get();
                        if (lnt === 0) req.hasAdmin = false;else req.hasAdmin = true;
                        next();
                        // res.status(200).json(lnt);
                        _context2.next = 11;
                        break;

                    case 8:
                        _context2.prev = 8;
                        _context2.t0 = _context2['catch'](0);

                        res.status(422).json(_context2.t0);

                    case 11:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 8]]);
    }));

    return function getAdmin(_x3, _x4, _x5) {
        return _ref2.apply(this, arguments);
    };
}();

// Get Admin 
var getAdminData = exports.getAdminData = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        if (!(req.user.type == 'admin')) {
                            _context3.next = 11;
                            break;
                        }

                        _context3.prev = 1;
                        _context3.next = 4;
                        return _admin.adminCrud.single({
                            qr: {
                                username: req.user.type,
                                type: req.user.type,
                                _id: req.user._id
                            },
                            select: '-password'
                        });

                    case 4:
                        user = _context3.sent;

                        // console.log(user);
                        res.status(201).json(user);
                        _context3.next = 11;
                        break;

                    case 8:
                        _context3.prev = 8;
                        _context3.t0 = _context3['catch'](1);

                        res.status(422).json(_context3.t0);

                    case 11:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[1, 8]]);
    }));

    return function getAdminData(_x6, _x7) {
        return _ref3.apply(this, arguments);
    };
}();

// Login Admin
var loginAdmin = exports.loginAdmin = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
        var _req$body, username, password, type;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _req$body = req.body, username = _req$body.username, password = _req$body.password, type = _req$body.type;
                        // console.log(req.hasAdmin)

                        _context4.prev = 1;
                        _context4.next = 4;
                        return _admin.adminModel.findOne({
                            $or: [{
                                'email': username
                            }, {
                                'username': username
                            }]
                        });

                    case 4:
                        user = _context4.sent;

                        if (user.isAuthenticated(password)) {
                            res.status(201).json(user.toAuthJSON());
                        } else {
                            res.status(500).json({
                                success: false
                            });
                        }
                        _context4.next = 11;
                        break;

                    case 8:
                        _context4.prev = 8;
                        _context4.t0 = _context4['catch'](1);
                        return _context4.abrupt('return', res.status(422).json(_context4.t0));

                    case 11:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined, [[1, 8]]);
    }));

    return function loginAdmin(_x8, _x9) {
        return _ref4.apply(this, arguments);
    };
}();

// Create Admin if not exists
var createAdmin = exports.createAdmin = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
        return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.prev = 0;
                        _context5.next = 3;
                        return _admin.adminCrud.create(req.body);

                    case 3:
                        user = _context5.sent;

                        res.status(201).json(user);
                        _context5.next = 10;
                        break;

                    case 7:
                        _context5.prev = 7;
                        _context5.t0 = _context5['catch'](0);

                        res.status(422).json(_context5.t0);

                    case 10:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined, [[0, 7]]);
    }));

    return function createAdmin(_x10, _x11) {
        return _ref5.apply(this, arguments);
    };
}();

// Update Admin
var updateAdmin = exports.updateAdmin = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res) {
        return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _context6.prev = 0;
                        _context6.next = 3;
                        return _admin.adminCrud.put({
                            params: {
                                qr: {
                                    _id: req.user._id,
                                    username: req.user.username
                                },
                                select: '-password'
                            },
                            body: req.body
                        });

                    case 3:
                        user = _context6.sent;

                        res.status(201).json(user);
                        _context6.next = 10;
                        break;

                    case 7:
                        _context6.prev = 7;
                        _context6.t0 = _context6['catch'](0);

                        res.status(422).json(_context6.t0);

                    case 10:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined, [[0, 7]]);
    }));

    return function updateAdmin(_x12, _x13) {
        return _ref6.apply(this, arguments);
    };
}();

var contact = void 0,
    mailto = void 0,
    charges = void 0,
    terms = void 0;

/*===========================
    Contact Controllers
==============================*/

// Get Contact Info
var getContactInfo = exports.getContactInfo = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee7(req, res) {
        return _regenerator2.default.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        _context7.prev = 0;
                        _context7.next = 3;
                        return _contactinfo.contactInfoCrud.get();

                    case 3:
                        contact = _context7.sent;

                        res.status(201).json(contact);
                        _context7.next = 10;
                        break;

                    case 7:
                        _context7.prev = 7;
                        _context7.t0 = _context7['catch'](0);

                        res.status(422).json(_context7.t0);

                    case 10:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, undefined, [[0, 7]]);
    }));

    return function getContactInfo(_x14, _x15) {
        return _ref7.apply(this, arguments);
    };
}();

// Update Contact Info
var updateContactInfo = exports.updateContactInfo = function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee8(req, res) {
        var check;
        return _regenerator2.default.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        !req.body._id && delete req.body._id;

                        if (!(req.user.type === 'admin')) {
                            _context8.next = 24;
                            break;
                        }

                        _context8.prev = 2;
                        _context8.next = 5;
                        return _contactinfo.contactInfoModel.countDocuments();

                    case 5:
                        check = _context8.sent;

                        if (!(check == 0)) {
                            _context8.next = 13;
                            break;
                        }

                        _context8.next = 9;
                        return _contactinfo.contactInfoCrud.create({
                            description: req.body.description,
                            iframe: req.body.iframe
                        });

                    case 9:
                        contact = _context8.sent;

                        res.status(202).json(contact);
                        _context8.next = 17;
                        break;

                    case 13:
                        _context8.next = 15;
                        return _contactinfo.contactInfoCrud.put({
                            params: {
                                qr: {
                                    _id: req.body._id
                                }
                            },
                            body: req.body
                        });

                    case 15:
                        contact = _context8.sent;

                        res.status(201).json(contact);

                    case 17:
                        _context8.next = 22;
                        break;

                    case 19:
                        _context8.prev = 19;
                        _context8.t0 = _context8['catch'](2);

                        res.status(422).json(_context8.t0);

                    case 22:
                        _context8.next = 25;
                        break;

                    case 24:
                        res.status(402).json({
                            err: true,
                            msg: 'You have no rights to edit this'
                        });

                    case 25:
                    case 'end':
                        return _context8.stop();
                }
            }
        }, _callee8, undefined, [[2, 19]]);
    }));

    return function updateContactInfo(_x16, _x17) {
        return _ref8.apply(this, arguments);
    };
}();

/*===========================
    MailTo Controllers
==============================*/

// Get Contact Info
var getMailTo = exports.getMailTo = function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee9(req, res) {
        return _regenerator2.default.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        if (!(req.user.type === 'admin')) {
                            _context9.next = 13;
                            break;
                        }

                        _context9.prev = 1;
                        _context9.next = 4;
                        return _mailto.mailtoCrud.get();

                    case 4:
                        mailto = _context9.sent;

                        res.status(201).json(mailto);
                        _context9.next = 11;
                        break;

                    case 8:
                        _context9.prev = 8;
                        _context9.t0 = _context9['catch'](1);

                        res.status(422).json(_context9.t0);

                    case 11:
                        _context9.next = 14;
                        break;

                    case 13:
                        res.status(402).json({
                            err: true,
                            msg: 'You have no rights to edit this'
                        });

                    case 14:
                    case 'end':
                        return _context9.stop();
                }
            }
        }, _callee9, undefined, [[1, 8]]);
    }));

    return function getMailTo(_x18, _x19) {
        return _ref9.apply(this, arguments);
    };
}();

// Update Contact Info
var updateMailTo = exports.updateMailTo = function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee10(req, res) {
        var check;
        return _regenerator2.default.wrap(function _callee10$(_context10) {
            while (1) {
                switch (_context10.prev = _context10.next) {
                    case 0:
                        !req.body._id && delete req.body._id;

                        if (!(req.user.type === 'admin')) {
                            _context10.next = 24;
                            break;
                        }

                        _context10.prev = 2;
                        _context10.next = 5;
                        return _mailto.mailtoModel.countDocuments();

                    case 5:
                        check = _context10.sent;

                        if (!(check == 0)) {
                            _context10.next = 13;
                            break;
                        }

                        _context10.next = 9;
                        return _mailto.mailtoCrud.create({
                            email: req.body.email,
                            password: req.body.password
                        });

                    case 9:
                        mailto = _context10.sent;

                        res.status(202).json(mailto);
                        _context10.next = 17;
                        break;

                    case 13:
                        _context10.next = 15;
                        return _mailto.mailtoCrud.put({
                            params: {
                                qr: {
                                    _id: req.body._id
                                }
                            },
                            body: {
                                email: req.body.email,
                                password: req.body.password
                            }
                        });

                    case 15:
                        mailto = _context10.sent;

                        res.status(201).json(mailto);

                    case 17:
                        _context10.next = 22;
                        break;

                    case 19:
                        _context10.prev = 19;
                        _context10.t0 = _context10['catch'](2);

                        res.status(422).json(_context10.t0);

                    case 22:
                        _context10.next = 25;
                        break;

                    case 24:
                        res.status(402).json({
                            err: true,
                            msg: 'You have no rights to edit this'
                        });

                    case 25:
                    case 'end':
                        return _context10.stop();
                }
            }
        }, _callee10, undefined, [[2, 19]]);
    }));

    return function updateMailTo(_x20, _x21) {
        return _ref10.apply(this, arguments);
    };
}();

/*===========================
    Charges Controllers
==============================*/

// Get Contact Info
var getCharges = exports.getCharges = function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee11(req, res) {
        return _regenerator2.default.wrap(function _callee11$(_context11) {
            while (1) {
                switch (_context11.prev = _context11.next) {
                    case 0:
                        if (!(req.user.type === 'admin')) {
                            _context11.next = 13;
                            break;
                        }

                        _context11.prev = 1;
                        _context11.next = 4;
                        return _charges.chargesCrud.get();

                    case 4:
                        charges = _context11.sent;

                        res.status(201).json(charges);
                        _context11.next = 11;
                        break;

                    case 8:
                        _context11.prev = 8;
                        _context11.t0 = _context11['catch'](1);

                        res.status(422).json(_context11.t0);

                    case 11:
                        _context11.next = 14;
                        break;

                    case 13:
                        res.status(402).json({
                            err: true,
                            msg: 'You have no rights to edit this'
                        });

                    case 14:
                    case 'end':
                        return _context11.stop();
                }
            }
        }, _callee11, undefined, [[1, 8]]);
    }));

    return function getCharges(_x22, _x23) {
        return _ref11.apply(this, arguments);
    };
}();

// Update Contact Info
var updateCharges = exports.updateCharges = function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee12(req, res) {
        var check;
        return _regenerator2.default.wrap(function _callee12$(_context12) {
            while (1) {
                switch (_context12.prev = _context12.next) {
                    case 0:
                        !req.body._id && delete req.body._id;

                        if (!(req.user.type === 'admin')) {
                            _context12.next = 24;
                            break;
                        }

                        _context12.prev = 2;
                        _context12.next = 5;
                        return _charges.chargesModel.countDocuments();

                    case 5:
                        check = _context12.sent;

                        if (!(check == 0)) {
                            _context12.next = 13;
                            break;
                        }

                        _context12.next = 9;
                        return _charges.chargesCrud.create(req.body);

                    case 9:
                        charges = _context12.sent;

                        res.status(202).json(charges);
                        _context12.next = 17;
                        break;

                    case 13:
                        _context12.next = 15;
                        return _charges.chargesCrud.put({
                            params: {
                                qr: {
                                    _id: req.body._id
                                }
                            },
                            body: req.body
                        });

                    case 15:
                        charges = _context12.sent;

                        res.status(201).json(charges);

                    case 17:
                        _context12.next = 22;
                        break;

                    case 19:
                        _context12.prev = 19;
                        _context12.t0 = _context12['catch'](2);

                        res.status(422).json(_context12.t0);

                    case 22:
                        _context12.next = 25;
                        break;

                    case 24:
                        res.status(402).json({
                            err: true,
                            msg: 'You have no rights to edit this'
                        });

                    case 25:
                    case 'end':
                        return _context12.stop();
                }
            }
        }, _callee12, undefined, [[2, 19]]);
    }));

    return function updateCharges(_x24, _x25) {
        return _ref12.apply(this, arguments);
    };
}();

/*===========================
    Terms Controllers
==============================*/

// Get Contact Info
var getTerms = exports.getTerms = function () {
    var _ref13 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee13(req, res) {
        return _regenerator2.default.wrap(function _callee13$(_context13) {
            while (1) {
                switch (_context13.prev = _context13.next) {
                    case 0:
                        if (!(req.user.type === 'admin')) {
                            _context13.next = 13;
                            break;
                        }

                        _context13.prev = 1;
                        _context13.next = 4;
                        return _terms.termsCrud.get();

                    case 4:
                        terms = _context13.sent;

                        res.status(201).json(terms);
                        _context13.next = 11;
                        break;

                    case 8:
                        _context13.prev = 8;
                        _context13.t0 = _context13['catch'](1);

                        res.status(422).json(_context13.t0);

                    case 11:
                        _context13.next = 14;
                        break;

                    case 13:
                        res.status(402).json({
                            err: true,
                            msg: 'You have no rights to edit this'
                        });

                    case 14:
                    case 'end':
                        return _context13.stop();
                }
            }
        }, _callee13, undefined, [[1, 8]]);
    }));

    return function getTerms(_x26, _x27) {
        return _ref13.apply(this, arguments);
    };
}();

// Update Contact Info
var updateTerms = exports.updateTerms = function () {
    var _ref14 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee14(req, res) {
        var check;
        return _regenerator2.default.wrap(function _callee14$(_context14) {
            while (1) {
                switch (_context14.prev = _context14.next) {
                    case 0:
                        !req.body._id && delete req.body._id;

                        if (!(req.user.type === 'admin')) {
                            _context14.next = 24;
                            break;
                        }

                        _context14.prev = 2;
                        _context14.next = 5;
                        return _terms.termsModel.countDocuments();

                    case 5:
                        check = _context14.sent;

                        if (!(check == 0)) {
                            _context14.next = 13;
                            break;
                        }

                        _context14.next = 9;
                        return _terms.termsCrud.create({
                            text: req.body.text
                        });

                    case 9:
                        terms = _context14.sent;

                        res.status(202).json(terms);
                        _context14.next = 17;
                        break;

                    case 13:
                        _context14.next = 15;
                        return _terms.termsCrud.put({
                            params: {
                                qr: {
                                    _id: req.body._id
                                }
                            },
                            body: req.body
                        });

                    case 15:
                        terms = _context14.sent;

                        res.status(201).json(terms);

                    case 17:
                        _context14.next = 22;
                        break;

                    case 19:
                        _context14.prev = 19;
                        _context14.t0 = _context14['catch'](2);

                        res.status(422).json(_context14.t0);

                    case 22:
                        _context14.next = 25;
                        break;

                    case 24:
                        res.status(402).json({
                            err: true,
                            msg: 'You have no rights to edit this'
                        });

                    case 25:
                    case 'end':
                        return _context14.stop();
                }
            }
        }, _callee14, undefined, [[2, 19]]);
    }));

    return function updateTerms(_x28, _x29) {
        return _ref14.apply(this, arguments);
    };
}();

var faq = void 0,
    faqs = void 0;

/*===========================
    Terms Controllers
==============================*/

// Get FAQ
var getFAQ = exports.getFAQ = function () {
    var _ref15 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee15(req, res) {
        return _regenerator2.default.wrap(function _callee15$(_context15) {
            while (1) {
                switch (_context15.prev = _context15.next) {
                    case 0:
                        _context15.prev = 0;
                        _context15.next = 3;
                        return _faq.faqCrud.get();

                    case 3:
                        faqs = _context15.sent;

                        res.status(201).json(faqs);
                        _context15.next = 10;
                        break;

                    case 7:
                        _context15.prev = 7;
                        _context15.t0 = _context15['catch'](0);

                        res.status(422).json(_context15.t0);

                    case 10:
                    case 'end':
                        return _context15.stop();
                }
            }
        }, _callee15, undefined, [[0, 7]]);
    }));

    return function getFAQ(_x30, _x31) {
        return _ref15.apply(this, arguments);
    };
}();

// Delete FAQ
var deleteFAQ = exports.deleteFAQ = function () {
    var _ref16 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee16(req, res) {
        return _regenerator2.default.wrap(function _callee16$(_context16) {
            while (1) {
                switch (_context16.prev = _context16.next) {
                    case 0:
                        _context16.prev = 0;
                        _context16.next = 3;
                        return _faq.faqCrud.delete({
                            params: {
                                qr: { _id: req.params.id }
                            }
                        });

                    case 3:
                        faqs = _context16.sent;

                        res.status(201).json(faqs);
                        _context16.next = 10;
                        break;

                    case 7:
                        _context16.prev = 7;
                        _context16.t0 = _context16['catch'](0);

                        res.status(422).json(_context16.t0);

                    case 10:
                    case 'end':
                        return _context16.stop();
                }
            }
        }, _callee16, undefined, [[0, 7]]);
    }));

    return function deleteFAQ(_x32, _x33) {
        return _ref16.apply(this, arguments);
    };
}();

// Create FAQ
var createFAQ = exports.createFAQ = function () {
    var _ref17 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee17(req, res) {
        return _regenerator2.default.wrap(function _callee17$(_context17) {
            while (1) {
                switch (_context17.prev = _context17.next) {
                    case 0:
                        if (!(req.user.type === 'admin')) {
                            _context17.next = 13;
                            break;
                        }

                        _context17.prev = 1;
                        _context17.next = 4;
                        return _faq.faqCrud.create(req.body);

                    case 4:
                        faq = _context17.sent;

                        res.status(201).json(faq);
                        _context17.next = 11;
                        break;

                    case 8:
                        _context17.prev = 8;
                        _context17.t0 = _context17['catch'](1);

                        res.status(422).json(_context17.t0);

                    case 11:
                        _context17.next = 14;
                        break;

                    case 13:
                        res.status(402).json({
                            err: true,
                            msg: 'You have no rights to create this'
                        });

                    case 14:
                    case 'end':
                        return _context17.stop();
                }
            }
        }, _callee17, undefined, [[1, 8]]);
    }));

    return function createFAQ(_x34, _x35) {
        return _ref17.apply(this, arguments);
    };
}();

// Update FAQ
var updateFAQ = exports.updateFAQ = function () {
    var _ref18 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee18(req, res) {
        return _regenerator2.default.wrap(function _callee18$(_context18) {
            while (1) {
                switch (_context18.prev = _context18.next) {
                    case 0:
                        !req.body._id && delete req.body._id;

                        if (!(req.user.type === 'admin')) {
                            _context18.next = 14;
                            break;
                        }

                        _context18.prev = 2;
                        _context18.next = 5;
                        return _faq.faqCrud.put({
                            params: {
                                qr: {
                                    _id: req.body._id
                                }
                            },
                            body: req.body
                        });

                    case 5:
                        faq = _context18.sent;

                        res.status(201).json(faq);
                        _context18.next = 12;
                        break;

                    case 9:
                        _context18.prev = 9;
                        _context18.t0 = _context18['catch'](2);

                        res.status(422).json(_context18.t0);

                    case 12:
                        _context18.next = 15;
                        break;

                    case 14:
                        res.status(402).json({
                            err: true,
                            msg: 'You have no rights to edit this'
                        });

                    case 15:
                    case 'end':
                        return _context18.stop();
                }
            }
        }, _callee18, undefined, [[2, 9]]);
    }));

    return function updateFAQ(_x36, _x37) {
        return _ref18.apply(this, arguments);
    };
}();