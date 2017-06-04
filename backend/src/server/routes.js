"use strict";

/**
 * App routes
 * 
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */

import { Router } from "express";

import { GET_PING } from "./handlers/ping_handler";
import { GET_STORES } from "./handlers/stores_handler";

const router = Router();

router.get("/ping", GET_PING);
router.get("/stores", GET_STORES);

export default router;
