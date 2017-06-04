"use strict";

/**
 *  This loads all the models in this directory
 * 
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// List files in this directory
var files = _fs2.default.readdirSync(__dirname);
// For every file found add a property to config var
var models = files.reduce(function (models, file) {
  // Prevent load this file
  if (file !== _path2.default.basename(__filename)) {
    var name = _path2.default.basename(file, _path2.default.extname(file));
    models[name] = require(_path2.default.join(__dirname, file)).default;
  }
  return models;
}, {});

exports.default = models;