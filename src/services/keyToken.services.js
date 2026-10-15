"use strict";

import { Types } from "mongoose";
import keytokenModel from "../models/keytoken.model.js";

class KeyTokenService {
  // mỗi shop chỉ có 1 bản ghi key: tạo mới hoặc ghi đè
  createKeyToken = async ({ userId, publicKey, refreshToken }) => {
    try {
      const filter = { user: userId },
        update = {
          publicKey,
          refreshTokensUsed: [],
          refreshToken,
        },
        options = { upsert: true, new: true };

      const tokens = await keytokenModel.findOneAndUpdate(
        filter,
        update,
        options,
      );

      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error;
    }
  };

  findByUserId = async (userId) => {
    return await keytokenModel
      .findOne({ user: new Types.ObjectId(userId) })
      .lean();
  };

  removeKeyById = async (id) => {
    return await keytokenModel.deleteOne({ _id: id });
  };
}

export default new KeyTokenService();
