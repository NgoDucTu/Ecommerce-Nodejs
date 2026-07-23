"use strict";

import accessServices from "../services/access.services.js";

class AccessController {
  signUp = async (req, res, next) => {
    return res.status(201).json(await accessServices.signUp(req.body));
  };
}

export default new AccessController();
