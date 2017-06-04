"use strict";

/**
 * Connect to mongodb using mongoose, this file export a promise to handle the connected and error event
 *
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */

import config from "./../config";

import mongoose from "mongoose";
import Promise from "bluebird";

export default new Promise((resolve, reject) => {
  mongoose.Promise = Promise;
  mongoose.connect(config.connections.mongo.url);
  mongoose.set("debug", config.connections.mongo.debug);
  mongoose.connection.once("error", reject);
  mongoose.connection.once("connected", resolve);
});
