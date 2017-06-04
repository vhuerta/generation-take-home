"use strict";

import { default as mongoose, Schema } from "mongoose";
import Promise from "bluebird";

mongoose.Promise = Promise;

const StoreSchema = new Schema(
  {
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
  },
  { collection: "stores" }
);

const Store = mongoose.model("Store", StoreSchema);

/**
 * Export the schema and model
 */
export { StoreSchema, Store as default };
