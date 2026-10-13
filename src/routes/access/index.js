"use strict";

import express from "express";
import accessControllers from "../../controllers/access.controllers.js";
import { asyncHandle } from "../../auth/checkAuth.js";

const router = express.Router();

router.post("/shop/sign-up", asyncHandle(accessControllers.signUp));

router.post("/shop/login", asyncHandle(accessControllers.login));

export default router;
