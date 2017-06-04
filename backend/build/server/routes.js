"use strict";

/**
 * App routes
 * 
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _ping_handler = require("./handlers/ping_handler");

var _stores_handler = require("./handlers/stores_handler");

var router = (0, _express.Router)();

router.get("/ping", _ping_handler.GET_PING);
router.get("/stores", _stores_handler.GET_STORES);

exports.default = router;