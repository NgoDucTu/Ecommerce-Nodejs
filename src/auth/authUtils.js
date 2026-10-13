"use strict";

import jwt from "jsonwebtoken";

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
