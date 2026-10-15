"use strict";

import { findById } from "../services/apiKey.services.js";
import { AuthFailureError, ForbiddenError } from "../core/error.response.js";
import { asyncHandle } from "../helpers/asyncHandler.js";

const HEADER = {
  APIKEY: "x-api-key",
  AUTHORIZATION: "authorization",
};

export const apiKey = asyncHandle(async (req, res, next) => {
  const key = req.header(HEADER.APIKEY)?.toString();
  if (!key) throw new AuthFailureError("Invalid API key");

  // check object key
  const objectKey = await findById(key);
  if (!objectKey) throw new AuthFailureError("Invalid API key");

  req.objectKey = objectKey;
  return next();
});

export const checkPermissions = (permission) => {
  return (req, res, next) => {
    if (!req.objectKey.permissions) {
      throw new ForbiddenError("Permission denied");
    }

    const invalidPremission = req.objectKey.permissions.includes(permission);
    if (!invalidPremission) {
      throw new ForbiddenError("Permission denied");
    }

    return next();
  };
};
