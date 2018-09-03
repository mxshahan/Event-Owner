'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CRUD = function () {
  function CRUD(model) {
    _classCallCheck(this, CRUD);

    this.model = model;
  }

  _createClass(CRUD, [{
    key: 'get',
    value: function get(options) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.model.find(options ? options.qr : {}).select(options ? options.select ? options.select : {} : {}) //eslint-disable-line
        .populate(options ? options.populate ? options.populate : '' : '') //eslint-disable-line
        .sort(options ? options.sort ? options.sort : '' : '') // eslint-disable-line
        .exec().then(function (result) {
          resolve(result);
        }).catch(function (e) {
          reject(e);
        });
      });
    }
  }, {
    key: 'single',
    value: function single(options) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.model.findOne(options ? options.qr : {}).select(options ? options.select ? options.select : {} : {}) //eslint-disable-line
        .populate(options ? options.populate ? options.populate : '' : '') //eslint-disable-line
        .exec().then(function (result) {
          resolve(result);
        }).catch(function (e) {
          reject(e);
        });
      });
    }
  }, {
    key: 'put',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(options) {
        var record;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.single(options.params);

              case 2:
                record = _context.sent;

                _extends(record, options.body);
                return _context.abrupt('return', new Promise(function (resolve, reject) {
                  record.save().then(function (result) {
                    resolve(result);
                  }).catch(function (e) {
                    reject(e);
                  });
                }));

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function put(_x) {
        return _ref.apply(this, arguments);
      }

      return put;
    }()
  }, {
    key: 'delete',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(options) {
        var record;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.single(options.params);

              case 2:
                record = _context2.sent;
                return _context2.abrupt('return', new Promise(function (resolve, reject) {
                  record.remove().then(function (result) {
                    resolve(result);
                  }).catch(function (e) {
                    reject(e);
                  });
                }));

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _delete(_x2) {
        return _ref2.apply(this, arguments);
      }

      return _delete;
    }()
  }, {
    key: 'create',
    value: function create(options) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        _this3.model.create(options).then(function (result) {
          resolve(result);
        }).catch(function (err) {
          reject(err);
        });
      });
    }
  }]);

  return CRUD;
}();

exports.default = CRUD;