'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileUpload = exports.checkAffiliate = exports.deleteAffiliate = exports.updateAffiliate = exports.createAffiliate = exports.LoginAffiliate = exports.getAffiliate = exports.getMyAccount = exports.googleLogin = exports.facebookRegister = exports.facebookSuccessLogin = exports.facebookLogin = exports.getAllAffiliate = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _file = require('../mid/file');

var _affiliate = require('../models/affiliate.model');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Affiliate = void 0;
var Affiliates = void 0;

var getAllAffiliate = exports.getAllAffiliate = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _affiliate.affiliateModel.find().select('-password').populate('events');

          case 3:
            Affiliates = _context.sent;


            res.status(200).json(Affiliates);
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](0);

            res.status(422).json(_context.t0);

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 7]]);
  }));

  return function getAllAffiliate(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var facebookLogin = exports.facebookLogin = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
    var newAffiliate;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _affiliate.affiliateModel.findOne({
              $or: [{
                email: req.body.email
              }, {
                social: {
                  facebook: {
                    id: req.body.AffiliateID
                  }
                }
              }]
            });

          case 3:
            Affiliate = _context2.sent;

            if (!Affiliate) {
              _context2.next = 10;
              break;
            }

            _extends(Affiliate.social, {
              facebook: {
                id: req.body.AffiliateID,
                token: req.body.accessToken
              }
            });
            Affiliate.save();
            res.status(201).json(Affiliate.toAuthJSON());
            _context2.next = 14;
            break;

          case 10:
            _context2.next = 12;
            return _affiliate.affiliateModel.create({
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              password: req.body.AffiliateID,
              email: req.body.email,
              username: req.body.username,
              profile_picture: req.body.picture,
              social: {
                facebook: {
                  accessToken: req.body.accessToken,
                  id: req.body.AffiliateID
                }
              }
            });

          case 12:
            newAffiliate = _context2.sent;

            res.status(201).json(newAffiliate.toAuthJSON());

          case 14:
            _context2.next = 19;
            break;

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2['catch'](0);

            res.status(500).json({
              msg: 'Failed to login',
              success: false,
              error: _context2.t0
            });

          case 19:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 16]]);
  }));

  return function facebookLogin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var facebookSuccessLogin = exports.facebookSuccessLogin = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log('success');

          case 1:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function facebookSuccessLogin(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var facebookRegister = exports.facebookRegister = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
    var newAffiliate;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _affiliate.affiliateModel.findOne({
              $or: [{
                email: req.body.email
              }, {
                social: {
                  facebook: {
                    id: req.body.AffiliateID
                  }
                }
              }]
            });

          case 3:
            Affiliate = _context4.sent;

            if (!Affiliate) {
              _context4.next = 8;
              break;
            }

            res.status(201).json(Affiliate.toAuthJSON());
            _context4.next = 12;
            break;

          case 8:
            _context4.next = 10;
            return _affiliate.affiliateModel.create({
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              password: req.body.AffiliateID,
              email: req.body.email,
              username: req.body.username,
              profile_picture: req.body.picture,
              social: {
                facebook: {
                  accessToken: req.body.accessToken,
                  id: req.body.AffiliateID
                }
              }
            });

          case 10:
            newAffiliate = _context4.sent;

            res.status(201).json(newAffiliate.toAuthJSON());

          case 12:
            _context4.next = 17;
            break;

          case 14:
            _context4.prev = 14;
            _context4.t0 = _context4['catch'](0);

            res.status(500).json({
              msg: 'Failed to login',
              success: false,
              error: _context4.t0
            });

          case 17:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 14]]);
  }));

  return function facebookRegister(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

var googleLogin = exports.googleLogin = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
    var newAffiliate;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _affiliate.affiliateModel.findOne({
              $or: [{
                email: req.body.email
              }, {
                social: {
                  google: {
                    id: req.body.AffiliateID
                  }
                }
              }]
            });

          case 3:
            Affiliate = _context5.sent;

            if (!Affiliate) {
              _context5.next = 10;
              break;
            }

            _extends(Affiliate.social, {
              google: {
                id: req.body.AffiliateID,
                token: req.body.accessToken
              }
            });
            Affiliate.save();
            res.status(201).json(Affiliate.toAuthJSON());
            _context5.next = 14;
            break;

          case 10:
            _context5.next = 12;
            return _affiliate.affiliateModel.create({
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              password: req.body.AffiliateID,
              email: req.body.email,
              username: req.body.username,
              profile_picture: req.body.picture,
              social: {
                google: {
                  accessToken: req.body.accessToken,
                  id: req.body.AffiliateID
                }
              }
            });

          case 12:
            newAffiliate = _context5.sent;

            res.status(201).json(newAffiliate.toAuthJSON());

          case 14:
            _context5.next = 19;
            break;

          case 16:
            _context5.prev = 16;
            _context5.t0 = _context5['catch'](0);

            res.status(500).json({
              msg: 'Failed to login',
              success: false,
              error: _context5.t0
            });

          case 19:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 16]]);
  }));

  return function googleLogin(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

var getMyAccount = exports.getMyAccount = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res) {
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            console.log(req.user._id);
            _context6.prev = 1;
            _context6.next = 4;
            return _affiliate.affiliateModel.findOne({
              _id: req.user._id
            }).select('-password').populate(_defineProperty({
              path: 'events gifts withdrawn categories affiliate_event',
              populate: {
                path: 'gifts',
                model: 'paymentModel'
              }
            }, 'populate', {
              path: 'type',
              model: 'categoriesModel'
            }));

          case 4:
            Affiliate = _context6.sent;

            res.status(201).json(Affiliate);
            _context6.next = 12;
            break;

          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6['catch'](1);

            console.log(_context6.t0);
            res.status(500).json(_context6.t0);

          case 12:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[1, 8]]);
  }));

  return function getMyAccount(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

var getAffiliate = exports.getAffiliate = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee7(req, res) {
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return _affiliate.affiliateModel.findOne({
              username: req.params.username
            }).select('-password').populate(_defineProperty({
              path: 'events gifts withdrawn categories affiliate_event',
              populate: {
                path: 'gifts',
                model: 'paymentModel'
              }
            }, 'populate', {
              path: 'type',
              model: 'categoriesModel'
            }));

          case 3:
            Affiliate = _context7.sent;

            res.status(201).json(Affiliate);
            _context7.next = 11;
            break;

          case 7:
            _context7.prev = 7;
            _context7.t0 = _context7['catch'](0);

            console.log(_context7.t0);
            res.status(500).json(_context7.t0);

          case 11:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[0, 7]]);
  }));

  return function getAffiliate(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

var LoginAffiliate = exports.LoginAffiliate = function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee8(req, res) {
    var _req$body, username, password;

    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _req$body = req.body, username = _req$body.username, password = _req$body.password;
            _context8.prev = 1;
            _context8.next = 4;
            return _affiliate.affiliateModel.findOne({
              $or: [{
                'email': username
              }, {
                'username': username
              }]
            });

          case 4:
            Affiliate = _context8.sent;

            if (Affiliate.isAuthenticated(password)) {
              res.status(201).json(Affiliate.toAuthJSON());
            } else {
              res.status(500).json({
                success: false
              });
            }
            _context8.next = 11;
            break;

          case 8:
            _context8.prev = 8;
            _context8.t0 = _context8['catch'](1);
            return _context8.abrupt('return', res.status(422).json(_context8.t0));

          case 11:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined, [[1, 8]]);
  }));

  return function LoginAffiliate(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

// export const updateProfile = async (req, res) => {
//   try {
//     Affiliate = await affiliateModel.create(req.body);
//     res.status(201).json(Affiliate.toAuthJSON())
//   } catch (e) {
//     res.status(500).json(e)
//   }
// }

var createAffiliate = exports.createAffiliate = function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee9(req, res) {
    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return _affiliate.affiliateModel.create(req.body);

          case 3:
            Affiliate = _context9.sent;

            res.status(201).json(Affiliate.toAuthJSON());
            _context9.next = 10;
            break;

          case 7:
            _context9.prev = 7;
            _context9.t0 = _context9['catch'](0);

            res.status(500).json(_context9.t0);

          case 10:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined, [[0, 7]]);
  }));

  return function createAffiliate(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

var updateAffiliate = exports.updateAffiliate = function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee10(req, res) {
    var AffiliateData;
    return _regenerator2.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _context10.next = 3;
            return _affiliate.affiliateCrud.put({
              params: {
                qr: {
                  _id: req.user._id
                }
              },
              body: req.body
            });

          case 3:
            Affiliate = _context10.sent;
            _context10.next = 6;
            return _affiliate.affiliateCrud.single({
              qr: { _id: Affiliate._id },
              select: '-password',
              populate: _defineProperty({
                path: 'events gifts withdrawn categories affiliate_event',
                populate: {
                  path: 'gifts',
                  model: 'paymentModel'
                }
              }, 'populate', {
                path: 'type',
                model: 'categoriesModel'
              })
            });

          case 6:
            AffiliateData = _context10.sent;

            res.status(201).json(AffiliateData);
            _context10.next = 13;
            break;

          case 10:
            _context10.prev = 10;
            _context10.t0 = _context10['catch'](0);

            res.status(422).json(_context10.t0);

          case 13:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined, [[0, 10]]);
  }));

  return function updateAffiliate(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();

var deleteAffiliate = exports.deleteAffiliate = function () {
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
            return _affiliate.affiliateCrud.delete({
              params: {
                qr: { username: req.params.username }
              }
            });

          case 4:
            Affiliate = _context11.sent;

            res.status(201).json(Affiliate);
            _context11.next = 11;
            break;

          case 8:
            _context11.prev = 8;
            _context11.t0 = _context11['catch'](1);

            res.status(500).json(_context11.t0);

          case 11:
            _context11.next = 14;
            break;

          case 13:
            res.status(422).json({ msg: 'You have no rights' });

          case 14:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, undefined, [[1, 8]]);
  }));

  return function deleteAffiliate(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();

var checkAffiliate = exports.checkAffiliate = function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee12(req, res) {
    var username;
    return _regenerator2.default.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            username = req.headers.username;
            _context12.prev = 1;
            _context12.next = 4;
            return _affiliate.affiliateModel.findOne({
              $or: [{
                'email': username
              }, {
                'username': username
              }]
            });

          case 4:
            Affiliate = _context12.sent;

            if (Affiliate) {
              res.status(202).json({
                found: true
              });
            } else {
              res.status(204).json({
                found: false
              });
            }
            _context12.next = 12;
            break;

          case 8:
            _context12.prev = 8;
            _context12.t0 = _context12['catch'](1);

            console.log(_context12.t0);
            res.status(422).json(_context12.t0);

          case 12:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, undefined, [[1, 8]]);
  }));

  return function checkAffiliate(_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}();

var fileUpload = exports.fileUpload = function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee13(req, res) {
    var singleAffiliate, filePath, fileName;
    return _regenerator2.default.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            _context13.next = 3;
            return _affiliate.affiliateCrud.single({
              qr: {
                _id: req.user._id
              }
            });

          case 3:
            singleAffiliate = _context13.sent;
            _context13.next = 6;
            return _affiliate.affiliateCrud.put({
              params: {
                qr: {
                  _id: req.user._id
                },
                select: '-password -events -gifts'
              },
              body: {
                profile_picture: req.filePath
              }
            });

          case 6:
            Affiliate = _context13.sent;
            filePath = singleAffiliate.profile_picture;

            if (!filePath) {
              _context13.next = 12;
              break;
            }

            fileName = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.length);
            _context13.next = 12;
            return (0, _file.fileDelete)(fileName);

          case 12:

            res.status(200).json(Affiliate);
            _context13.next = 18;
            break;

          case 15:
            _context13.prev = 15;
            _context13.t0 = _context13['catch'](0);

            res.status(422).json(_context13.t0);

          case 18:
          case 'end':
            return _context13.stop();
        }
      }
    }, _callee13, undefined, [[0, 15]]);
  }));

  return function fileUpload(_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}();