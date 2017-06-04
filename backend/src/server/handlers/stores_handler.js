"use strict";

/**
 * Stores Handler, methods for ping routes
 *
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */
import redis from "../../connections/redis";
import Store from "../../model/stores";

export const GET_STORES = (req, res, next) => {
  redis
    .getAsync("STORES") // Try to get the stores from redis
    .then(
      res =>
        (res
          ? JSON.parse(res)
          : Store.find({ geolocation: { $ne: null, $exists: true } }).lean()) // If not found get from database
    )
    .then(
      stores =>
        (redis.setAsync("STORES", JSON.stringify(stores)), res.out({
          code: 200,
          data: { stores }
        }))
    )
    .catch(err => (console.log(err), res.out({ code: 500 })));
};
