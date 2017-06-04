"use strict";

/**
 * Connect to mongodb using mongoose, this file export a promise to handle the connected and error event
 *
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require("./../config");

var _config2 = _interopRequireDefault(_config);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bluebird = require("bluebird");

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _bluebird2.default(function (resolve, reject) {
  _mongoose2.default.Promise = _bluebird2.default;
  _mongoose2.default.connect(_config2.default.connections.mongo.url);
  _mongoose2.default.set("debug", _config2.default.connections.mongo.debug);
  _mongoose2.default.connection.once("error", reject);
  _mongoose2.default.connection.once("connected", resolve);
});