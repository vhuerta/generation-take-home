"use strict";

/**
 * Exports a promise of all the things needed before start the server,
 * like database connections
 *
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */

import mongoose from "../connections/mongoose";
import models from "../model";
import { connection as redis } from "../connections/redis";

export default () => Promise.all([mongoose, models, redis]);
