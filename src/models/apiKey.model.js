"use strict";

import { model, Schema } from "mongoose";

const DOCUMENT_NAME = "ApiKey";
const COLLECTION_NAME = "ApiKeys";

// Declare the Schema of the Mongo model
const ApiKeySchema = new Schema(
  {
    key: {
      type: String,
      require: true,
      ref: "Shop",
    },
    status: {
      type: Boolean,
      required: true,
    },
    permissions: {
      type: [String],
      required: true,
      enum: ["0000", "1111", "2222"],
    },
  },
  {
    timestamps: true,
    Collection: COLLECTION_NAME,
  },
);

//Export the model
export default model(DOCUMENT_NAME, ApiKeySchema);
