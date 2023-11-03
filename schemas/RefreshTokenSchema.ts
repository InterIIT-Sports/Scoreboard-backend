import { Schema, model } from "mongoose";
import { RefreshToken } from "../types/Tokens";

const refreshTokenSchema = new Schema<RefreshToken>({
  refreshToken: {
    type: String,
    required: true,
  },
});

const RefreshTokenSchema = model("RefreshTokens", refreshTokenSchema);

export default RefreshTokenSchema;
