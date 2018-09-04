'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileDelete = exports.fileUploadMiddlware = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _shortid = require('shortid');

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var fileUploadMiddlware = exports.fileUploadMiddlware = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    var sampleFile, ext, newFilename, uploadPath, uploadStatus;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (req.files) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return', res.status(400).send('No files were uploaded.'));

          case 2:

            // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
            sampleFile = req.files.file;
            // Use the mv() method to place the file somewhere on your server

            ext = sampleFile.name.split('.');
            newFilename = Date.now() + '-' + (0, _shortid.generate)() + '.' + ext[1];
            uploadPath = './public/uploads/' + newFilename;
            uploadStatus = sampleFile.mv(uploadPath);


            req.filename = newFilename;

            if (uploadStatus) {
              _context.next = 10;
              break;
            }

            return _context.abrupt('return', res.status(500).send(err));

          case 10:
            next();

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function fileUploadMiddlware(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var fileDelete = exports.fileDelete = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(file) {
    var filePath;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!file) {
              _context2.next = 14;
              break;
            }

            filePath = './public/uploads/' + file;

            console.log(filePath);
            _context2.prev = 3;
            _context2.next = 6;
            return _fsExtra2.default.remove(filePath);

          case 6:
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2['catch'](3);

            console.log(_context2.t0); //eslint-disable-line

          case 11:
            return _context2.abrupt('return', file);

          case 14:
            console.log('no file found');

          case 15:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[3, 8]]);
  }));

  return function fileDelete(_x4) {
    return _ref2.apply(this, arguments);
  };
}();