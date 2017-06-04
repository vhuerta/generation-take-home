"use strict";

/**
 * Exports a promise of all the things needed before start the server,
 * like database connections
 *
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("../connections/mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _model = require("../model");

var _model2 = _interopRequireDefault(_model);

var _redis = require("../connections/redis");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return Promise.all([_mongoose2.default, _model2.default, _redis.connection]);
};