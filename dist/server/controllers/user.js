'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileUpload = exports.checkUser = exports.getUser = exports.updateUser = exports.createUser = exports.LoginUser = exports.getAllUser = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _user = require('../models/user.model');

var _shortid = require('shortid');

var _file = require('../mid/file');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
            return _user.userCrud.get({
              select: '-password'
            });

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

var LoginUser = exports.LoginUser = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
    var _req$body, username, password;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, username = _req$body.username, password = _req$body.password;
            _context2.prev = 1;
            _context2.next = 4;
            return _user.userModel.findOne({
              $or: [{
                'email': username
              }, {
                'username': username
              }]
            });

          case 4:
            user = _context2.sent;

            if (user.isAuthenticated(password)) {
              res.status(201).json(user.toAuthJSON());
            } else {
              res.status(500).json({
                success: false
              });
            }
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2['catch'](1);
            return _context2.abrupt('return', res.status(422).json(_context2.t0));

          case 11:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[1, 8]]);
  }));

  return function LoginUser(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var createUser = exports.createUser = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _user.userModel.create(req.body);

          case 3:
            user = _context3.sent;

            res.status(201).json(user.toAuthJSON());
            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3['catch'](0);

            res.status(500).json(_context3.t0);

          case 10:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 7]]);
  }));

  return function createUser(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var updateUser = exports.updateUser = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _user.userCrud.put({
              params: {
                qr: {
                  _id: req.user._id
                }
              },
              body: req.body
            });

          case 3:
            user = _context4.sent;
            _context4.next = 9;
            break;

          case 6:
            _context4.prev = 6;
            _context4.t0 = _context4['catch'](0);

            console.log(_context4.t0);

          case 9:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 6]]);
  }));

  return function updateUser(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

var getUser = exports.getUser = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _user.userModel.findOne({
              username: req.user.username
            }).select('-password -events -gifts');

          case 3:
            user = _context5.sent;

            res.status(201).json({
              user: user
            });
            _context5.next = 10;
            break;

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5['catch'](0);

            res.status(500).json(_context5.t0);

          case 10:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 7]]);
  }));

  return function getUser(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

var checkUser = exports.checkUser = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res) {
    var username;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            // console.log(req.headers.username);
            username = req.headers.username;
            _context6.prev = 1;
            _context6.next = 4;
            return _user.userModel.findOne({
              $or: [{
                'email': username
              }, {
                'username': username
              }]
            });

          case 4:
            user = _context6.sent;

            if (user) {
              res.status(202).json({
                found: true
              });
            } else {
              res.status(204).json({
                found: false
              });
            }
            _context6.next = 11;
            break;

          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6['catch'](1);

            res.status(422).json(_context6.t0);

          case 11:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[1, 8]]);
  }));

  return function checkUser(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

var fileUpload = exports.fileUpload = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee7(req, res) {
    var singleUser, filePath, fileName;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return _user.userCrud.single({
              qr: {
                _id: req.user._id
              }
            });

          case 3:
            singleUser = _context7.sent;
            _context7.next = 6;
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
            user = _context7.sent;
            filePath = singleUser.profile_picture;

            if (!filePath) {
              _context7.next = 12;
              break;
            }

            fileName = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.length);
            _context7.next = 12;
            return (0, _file.fileDelete)(fileName);

          case 12:

            res.status(200).json(user);
            _context7.next = 18;
            break;

          case 15:
            _context7.prev = 15;
            _context7.t0 = _context7['catch'](0);

            res.status(422).json(_context7.t0);

          case 18:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[0, 15]]);
  }));

  return function fileUpload(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();