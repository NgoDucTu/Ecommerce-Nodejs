"use strict";

import { CREATED } from "../core/success.response.js";
import accessServices from "../services/access.services.js";

class AccessController {
  signUp = async (req, res, next) => {
    new CREATED({
      message: "Register OK",
      metadata: await accessServices.signUp(req.body),
    }).send(res);
  };
}

export default new AccessController();
