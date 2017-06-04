"use strict";

/**
 * Connections configuration constants
 * 
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  mongo: {
    url: process.env.MONGODB_URI || "mongodb://localhost/generation",
    debug: process.env.MONGO_DEBUG && process.env.MONGO_DEBUG === "true"
  },
  redis: {
    url: process.env.REDISCLOUD_URL || "redis://localhost:6379"
  }
};