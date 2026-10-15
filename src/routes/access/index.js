"use strict";

import express from "express";
import accessControllers from "../../controllers/access.controllers.js";
import { asyncHandle } from "../../helpers/asyncHandler.js";
import { authentication } from "../../auth/authUtils.js";

const router = express.Router();

router.post("/shop/sign-up", asyncHandle(accessControllers.signUp));

router.post("/shop/login", asyncHandle(accessControllers.login));

// authentication
router.use(authentication);
// logout
router.post("/shop/logout", asyncHandle(accessControllers.logout));

export default router;
