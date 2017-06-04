"use strict";

/**
 * Stores Handler, methods for ping routes
 *
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GET_STORES = undefined;

var _redis = require("../../connections/redis");

var _redis2 = _interopRequireDefault(_redis);

var _stores = require("../../model/stores");

var _stores2 = _interopRequireDefault(_stores);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GET_STORES = exports.GET_STORES = function GET_STORES(req, res, next) {
  _redis2.default.getAsync("STORES" // Try to get the stores from redis
  ).then(function (res) {
    return res ? JSON.parse(res) : _stores2.default.find({ geolocation: { $ne: null, $exists: true } } // If not found get from database
    ).lean().then(function (stores) {
      return stores.map(function (s) {
        return {
          name: s.name,
          address: s.address,
          geolocation: s.geolocation.geometry.location
        };
      });
    });
  }
  // Add to redis and send response
  ).then(function (stores) {
    return _redis2.default.setAsync("STORES", JSON.stringify(stores)), stores, res.out({
      code: 200,
      data: { stores: stores }
    });
  }).catch(function (err) {
    return console.log(err), res.out({ code: 500 });
  });
};