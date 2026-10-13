"use strict";

import crypto from "node:crypto";
import bcrypt from "bcrypt";
import shopModel from "../models/shop.model.js";
import KeyTokenService from "./keyToken.services.js";
import { createTokenPair } from "../auth/authUtils.js";
import { RoleShop } from "../common/constant.js";
import getInfoData from "../utils/index.js";
import {
  AuthFailureError,
  BadRequestError,
  ConflictRequestError,
  InternalServerError,
} from "../core/error.response.js";
import { findByEmail } from "./shop.services.js";

const SALT_ROUNDS = 10;
const SHOP_PUBLIC_FIELDS = ["_id", "name", "email"];

const generateKeyPair = () =>
  crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096,
    publicKeyEncoding: { type: "pkcs1", format: "pem" },
    privateKeyEncoding: { type: "pkcs1", format: "pem" },
  });

// tạo cặp key mới, ký AT/RT và lưu publicKey + refreshToken cho shop
const issueTokens = async (shop) => {
  const { publicKey, privateKey } = generateKeyPair();

  const tokens = await createTokenPair(
    { userId: shop._id, email: shop.email },
    publicKey,
    privateKey,
  );

  const savedPublicKey = await KeyTokenService.createKeyToken({
    userId: shop._id,
    publicKey,
    refreshToken: tokens.refreshToken,
  });
  if (!savedPublicKey) {
    throw new InternalServerError("Error creating key token");
  }

  return tokens;
};

const buildAuthResult = async (shop) => ({
  shop: getInfoData({ fields: SHOP_PUBLIC_FIELDS, object: shop }),
  tokens: await issueTokens(shop),
});

class AccessService {
  /*
  1. Check email chưa tồn tại
  2. Hash password, tạo shop
  3. Cấp token
  */
  signUp = async ({ name, email, password }) => {
    const holderShop = await findByEmail({ email });
    if (holderShop) {
      throw new ConflictRequestError("Error: Shop already registered !");
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const newShop = await shopModel.create({
      name,
      email,
      password: passwordHash,
      roles: [RoleShop.SHOP],
    });

    return buildAuthResult(newShop);
  };

  /*
  1. Check email tồn tại
  2. Match password
  3. Cấp token
  */
  login = async ({ email, password }) => {
    const foundShop = await findByEmail({ email });
    if (!foundShop) throw new BadRequestError("Shop not registered");

    const match = await bcrypt.compare(password, foundShop.password);
    if (!match) throw new AuthFailureError("Authentication Error");

    return buildAuthResult(foundShop);
  };
}

export default new AccessService();
