'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileUpload = exports.checkUser = exports.deleteUser = exports.updateUser = exports.createUser = exports.LoginUser = exports.getUser = exports.googleLogin = exports.facebookRegister = exports.facebookSuccessLogin = exports.facebookLogin = exports.getAllUser = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _user = require('../models/user.model');

var _file = require('../mid/file');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var user = void 0;
var users = void 0;

var getAllUser = exports.getAllUser = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _user.userModel.find().select('-password').populate('events');

          case 3:
            users = _context.sent;


            res.status(200).json(users);
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

  return function getAllUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var facebookLogin = exports.facebookLogin = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
    var newUser;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _user.userModel.findOne({
              $or: [{
                email: req.body.email
              }, {
                social: {
                  facebook: {
                    id: req.body.userID
                  }
                }
              }]
            });

          case 3:
            user = _context2.sent;

            if (!user) {
              _context2.next = 10;
              break;
            }

            _extends(user.social, {
              facebook: {
                id: req.body.userID,
                token: req.body.accessToken
              }
            });
            user.save();
            res.status(201).json(user.toAuthJSON());
            _context2.next = 14;
            break;

          case 10:
            _context2.next = 12;
            return _user.userModel.create({
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              password: req.body.userID,
              email: req.body.email,
              username: req.body.username,
              profile_picture: req.body.picture,
              social: {
                facebook: {
                  accessToken: req.body.accessToken,
                  id: req.body.userID
                }
              }
            });

          case 12:
            newUser = _context2.sent;

            res.status(201).json(newUser.toAuthJSON());

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
    var newUser;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _user.userModel.findOne({
              $or: [{
                email: req.body.email
              }, {
                social: {
                  facebook: {
                    id: req.body.userID
                  }
                }
              }]
            });

          case 3:
            user = _context4.sent;

            if (!user) {
              _context4.next = 8;
              break;
            }

            res.status(201).json(user.toAuthJSON());
            _context4.next = 12;
            break;

          case 8:
            _context4.next = 10;
            return _user.userModel.create({
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              password: req.body.userID,
              email: req.body.email,
              username: req.body.username,
              profile_picture: req.body.picture,
              social: {
                facebook: {
                  accessToken: req.body.accessToken,
                  id: req.body.userID
                }
              }
            });

          case 10:
            newUser = _context4.sent;

            res.status(201).json(newUser.toAuthJSON());

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
    var newUser;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _user.userModel.findOne({
              $or: [{
                email: req.body.email
              }, {
                social: {
                  google: {
                    id: req.body.userID
                  }
                }
              }]
            });

          case 3:
            user = _context5.sent;

            if (!user) {
              _context5.next = 10;
              break;
            }

            _extends(user.social, {
              google: {
                id: req.body.userID,
                token: req.body.accessToken
              }
            });
            user.save();
            res.status(201).json(user.toAuthJSON());
            _context5.next = 14;
            break;

          case 10:
            _context5.next = 12;
            return _user.userModel.create({
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              password: req.body.userID,
              email: req.body.email,
              username: req.body.username,
              profile_picture: req.body.picture,
              social: {
                google: {
                  accessToken: req.body.accessToken,
                  id: req.body.userID
                }
              }
            });

          case 12:
            newUser = _context5.sent;

            res.status(201).json(newUser.toAuthJSON());

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

var getUser = exports.getUser = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res) {
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _user.userModel.findOne({
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
            user = _context6.sent;

            res.status(201).json(user);
            _context6.next = 11;
            break;

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6['catch'](0);

            console.log(_context6.t0);
            res.status(500).json(_context6.t0);

          case 11:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[0, 7]]);
  }));

  return function getUser(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

var LoginUser = exports.LoginUser = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee7(req, res) {
    var _req$body, username, password;

    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _req$body = req.body, username = _req$body.username, password = _req$body.password;
            _context7.prev = 1;
            _context7.next = 4;
            return _user.userModel.findOne({
              $or: [{
                'email': username
              }, {
                'username': username
              }]
            });

          case 4:
            user = _context7.sent;

            if (user.isAuthenticated(password)) {
              res.status(201).json(user.toAuthJSON());
            } else {
              res.status(500).json({
                success: false
              });
            }
            _context7.next = 11;
            break;

          case 8:
            _context7.prev = 8;
            _context7.t0 = _context7['catch'](1);
            return _context7.abrupt('return', res.status(422).json(_context7.t0));

          case 11:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[1, 8]]);
  }));

  return function LoginUser(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

// export const updateProfile = async (req, res) => {
//   try {
//     user = await userModel.create(req.body);
//     res.status(201).json(user.toAuthJSON())
//   } catch (e) {
//     res.status(500).json(e)
//   }
// }

var createUser = exports.createUser = function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee8(req, res) {
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return _user.userModel.create(req.body);

          case 3:
            user = _context8.sent;

            res.status(201).json(user.toAuthJSON());
            _context8.next = 10;
            break;

          case 7:
            _context8.prev = 7;
            _context8.t0 = _context8['catch'](0);

            res.status(500).json(_context8.t0);

          case 10:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined, [[0, 7]]);
  }));

  return function createUser(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

var updateUser = exports.updateUser = function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee9(req, res) {
    var userData;
    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return _user.userCrud.put({
              params: {
                qr: {
                  _id: req.user._id
                }
              },
              body: req.body
            });

          case 3:
            user = _context9.sent;
            _context9.next = 6;
            return _user.userCrud.single({
              qr: { _id: user._id },
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
            userData = _context9.sent;

            res.status(201).json(userData);
            _context9.next = 13;
            break;

          case 10:
            _context9.prev = 10;
            _context9.t0 = _context9['catch'](0);

            res.status(422).json(_context9.t0);

          case 13:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined, [[0, 10]]);
  }));

  return function updateUser(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

var deleteUser = exports.deleteUser = function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee10(req, res) {
    return _regenerator2.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            if (!(req.user.type === 'admin')) {
              _context10.next = 13;
              break;
            }

            _context10.prev = 1;
            _context10.next = 4;
            return _user.userCrud.delete({
              params: {
                qr: { username: req.params.username }
              }
            });

          case 4:
            user = _context10.sent;

            res.status(201).json(user);
            _context10.next = 11;
            break;

          case 8:
            _context10.prev = 8;
            _context10.t0 = _context10['catch'](1);

            res.status(500).json(_context10.t0);

          case 11:
            _context10.next = 14;
            break;

          case 13:
            res.status(422).json({ msg: 'You have no rights' });

          case 14:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined, [[1, 8]]);
  }));

  return function deleteUser(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();

var checkUser = exports.checkUser = function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee11(req, res) {
    var username;
    return _regenerator2.default.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            // console.log(req.headers.username);
            username = req.headers.username;
            _context11.prev = 1;
            _context11.next = 4;
            return _user.userModel.findOne({
              $or: [{
                'email': username
              }, {
                'username': username
              }]
            });

          case 4:
            user = _context11.sent;

            if (user) {
              res.status(202).json({
                found: true
              });
            } else {
              res.status(204).json({
                found: false
              });
            }
            _context11.next = 11;
            break;

          case 8:
            _context11.prev = 8;
            _context11.t0 = _context11['catch'](1);

            res.status(422).json(_context11.t0);

          case 11:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, undefined, [[1, 8]]);
  }));

  return function checkUser(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();

var fileUpload = exports.fileUpload = function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee12(req, res) {
    var singleUser, filePath, fileName;
    return _regenerator2.default.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            _context12.next = 3;
            return _user.userCrud.single({
              qr: {
                _id: req.user._id
              }
            });

          case 3:
            singleUser = _context12.sent;
            _context12.next = 6;
            return _user.userCrud.put({
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
            user = _context12.sent;
            filePath = singleUser.profile_picture;

            if (!filePath) {
              _context12.next = 12;
              break;
            }

            fileName = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.length);
            _context12.next = 12;
            return (0, _file.fileDelete)(fileName);

          case 12:

            res.status(200).json(user);
            _context12.next = 18;
            break;

          case 15:
            _context12.prev = 15;
            _context12.t0 = _context12['catch'](0);

            res.status(422).json(_context12.t0);

          case 18:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, undefined, [[0, 15]]);
  }));

  return function fileUpload(_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}();