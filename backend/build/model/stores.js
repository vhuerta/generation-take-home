"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.StoreSchema = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bluebird = require("bluebird");

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = _bluebird2.default;

var StoreSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  addresss: {
    type: String,
    required: true
  },
  geolocation: {
    type: Object
  }
}, { collection: "stores" });

var Store = _mongoose2.default.model("Store", StoreSchema);

/**
 * Export the schema and model
 */
exports.StoreSchema = StoreSchema;
exports.default = Store;