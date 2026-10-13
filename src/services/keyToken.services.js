"use strict";

import keytokenModel from "../models/keytoken.model.js";

class KeyTokenService {
  // mỗi shop chỉ có 1 bản ghi key: tạo mới hoặc ghi đè
  createKeyToken = async ({ userId, publicKey, refreshToken }) => {
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
  };
}

export default new KeyTokenService();
