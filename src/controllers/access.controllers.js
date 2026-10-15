"use strict";

import { CREATED, SuccessResponse } from "../core/success.response.js";
import accessServices from "../services/access.services.js";

class AccessController {
  signUp = async (req, res, next) => {
    new CREATED({
      message: "Register OK",
      metadata: await accessServices.signUp(req.body),
    }).send(res);
  };

  login = async (req, res, next) => {
    new SuccessResponse({
      message: "Login OK",
      metadata: await accessServices.login(req.body),
    }).send(res);
  };

  logout = async (req, res, next) => {
    new SuccessResponse({
      message: "Success logout",
      metadata: await accessServices.logout({ keyStore: req.keyStore }),
    }).send(res);
  };
}

export default new AccessController();
