"use strict";

import crypto from "node:crypto";
import apiKeyModel from "../models/apiKey.model.js";

const initApiKey = async () => {
  const existingKey = await apiKeyModel.findOne().lean();
  if (existingKey) return;

  const key = crypto.randomBytes(64).toString("hex");
  await apiKeyModel.create({
    key,
    status: true,
    permissions: ["0000"],
  });

  console.log(`API KEY CREATED: ${key}`);
};

export default initApiKey;
