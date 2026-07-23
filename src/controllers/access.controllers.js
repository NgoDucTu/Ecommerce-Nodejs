"use strict";

import accessServices from "../services/access.services.js";

class AccessController {
  signUp = async (req, res, next) => {
    try {
      console.log(`[P]::signUp::`, req.body);
      return res.status(201).json(await accessServices.signUp(req.body));
    } catch (error) {
      next(error);
    }
  };
}

export default new AccessController();
