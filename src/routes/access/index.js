"use strict";

import express from "express";
import accessControllers from "../../controllers/access.controllers.js";

const router = express.Router();

router.post("/shop/sign-up", accessControllers.signUp);
export default router;
