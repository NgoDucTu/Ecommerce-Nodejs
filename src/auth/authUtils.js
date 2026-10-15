"use strict";

import jwt from "jsonwebtoken";
import { asyncHandle } from "../helpers/asyncHandler.js";
import { AuthFailureError, NotFoundError } from "../core/error.response.js";
import keyTokenServices from "../services/keyToken.services.js";

const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
  AUTHORIZATION: "authorization",
};

export const createTokenPair = async (payload, publicKey, privateKey) => {
  const accessToken = jwt.sign(payload, privateKey, {
    algorithm: "RS256",
    expiresIn: "2 days",
  });

  const refreshToken = jwt.sign(payload, privateKey, {
    algorithm: "RS256",
    expiresIn: "7 days",
  });

  // ném lỗi nếu publicKey không khớp privateKey
  jwt.verify(accessToken, publicKey, { algorithms: ["RS256"] });

  return { accessToken, refreshToken };
};

export const authentication = asyncHandle(async (req, res, next) => {
  /* 
    1, Check userId in header
    2, Check ketStore Db with userId
    3, Check authoriztion
    4, Decode User by AT -> next() or throw err
  */

  const userId = req.header(HEADER.CLIENT_ID);
  if (!userId) throw new AuthFailureError("Invalid request");

  const keyStore = await keyTokenServices.findByUserId(userId);
  if (!keyStore) throw new NotFoundError("keyStore not found");

  const accessToken = req.header(HEADER.AUTHORIZATION);
  if (!accessToken) throw new AuthFailureError("Invalid request");
  try {
    const decodeUser = jwt.verify(accessToken, keyStore.publicKey);
    if (userId !== decodeUser.userId)
      throw new AuthFailureError("Invalid UserId");
    req.keyStore = keyStore;
    return next();
  } catch (error) {
    throw error;
  }
});
