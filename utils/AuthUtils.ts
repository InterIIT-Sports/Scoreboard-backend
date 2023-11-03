import * as jwt from "jsonwebtoken";
import UserModel from "../schemas/UserModel";
import { UsernameAlreadyExistError } from "./AuthErrors";
import { User } from "../types/User";
import { UserRole } from "../types/UserRole";
import { AccessToken, AccessTokenTypes, RefreshToken } from "../types/Tokens";

const ACCESS_TOKEN_EXPIRY_TIME = "10m";

export const loginWithUsernameAndPassword = async (username: string, password: string) => {
  const user = await UserModel.findOne({ username, password });
  // if (user.)
  console.log(user);
};

export const createUserWithUsernameAndPassword = async (
  name: string,
  username: string,
  password: string,
  role: UserRole
) => {
  const existingUsers = await UserModel.find({ username });
  if (existingUsers.length !== 0) {
    throw UsernameAlreadyExistError;
  }
  const user: User = { name, username, password, role };
  const newUser = new UserModel(user);
  await newUser.save();

  return { ...getAccessToken(user), refreshToken: getRefreshToken(user).refreshToken };
};

export const getAccessToken = (user: User): AccessToken => {
  return { accessToken: " ", type: AccessTokenTypes.BEARER };
};

export const getRefreshToken = (user: User): RefreshToken => {
  return { refreshToken: "" };
};

export const revokeRefreshToken = (refreshToken: RefreshToken) => {};

export const verifyAccessToken = () => {};
