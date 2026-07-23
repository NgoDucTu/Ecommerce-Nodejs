"use strict";

import crypto from "node:crypto";
import bcrypt from "bcrypt";
import shopModel from "../models/shop.model.js";
import KeyTokenService from "./keyToken.services.js";
import { createTokenPair } from "../auth/authUtils.js";
import { RoleShop } from "../common/constant.js";
import getInfoData from "../utils/index.js";
import { BadRequestError } from "../core/error.response.js";

class AccessService {
  signUp = async ({ name, email, password }) => {
    const hodelShop = await shopModel.findOne({ email }).lean();
    if (hodelShop)
      throw new BadRequestError("Error: Shop already registered !");

    const passwordHash = await bcrypt.hash(password, 10);
    const newShop = await shopModel.create({
      name,
      email,
      password: passwordHash,
      roles: [RoleShop.SHOP],
    });

    // create key public / private key
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: "pkcs1",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs1",
        format: "pem",
      },
    });

    const publicKeyString = await KeyTokenService.createKeyToken({
      userId: newShop._id,
      publicKey,
    });

    if (!publicKeyString) {
      throw new BadRequestError("Error creating key token");
    }

    const token = await createTokenPair(
      { userId: newShop._id, email },
      publicKeyString,
      privateKey,
    );

    console.log(`token created success::`, token);

    return {
      code: 201,
      metadata: {
        shop: getInfoData({
          fields: ["_id", "name", "email"],
          object: newShop,
        }),
        tokens: token,
      },
    };
  };
}

export default new AccessService();
