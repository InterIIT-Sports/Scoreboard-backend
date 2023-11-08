import * as jwt from "jsonwebtoken";
import UserModel from "../schemas/UserModel";
import { InvalidUsernameOrPassword, UsernameAlreadyExistError } from "./AuthErrors";
import { User } from "../types/User";
import { UserRole } from "../types/UserRole";
import { AccessToken, AccessTokenTypes, RefreshToken, Token } from "../types/Tokens";
import RefreshTokenModel from "../schemas/RefreshTokenModel";

const ACCESS_TOKEN_EXPIRY_TIME = "10m";

export const loginWithUsernameAndPassword = async (username: string, password: string) => {
  const user = await UserModel.findOne({ username, password });
  if (!user) throw InvalidUsernameOrPassword;

  return {
    ...user,
    ...getAccessToken({ username: user.username, password: user.password, name: user.name, role: user.role }),
    refreshToken: (
      await getRefreshToken({ username: user.username, password: user.password, name: user.name, role: user.role })
    ).refreshToken,
  };
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

  return { ...user, ...getAccessToken(user), refreshToken: (await getRefreshToken(user)).refreshToken };
};

export const getAccessToken = (user: User): AccessToken => {
  const token: Token = jwt.sign({ ...user }, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: ACCESS_TOKEN_EXPIRY_TIME,
  });
  return { accessToken: token, type: AccessTokenTypes.BEARER };
};

export const deleteUser = async (username: string) => {
  const user = await UserModel.findOne({ username });
  if (!user) throw InvalidUsernameOrPassword;

  await user.deleteOne();
};

export const getRefreshToken = async (user: User): Promise<RefreshToken> => {
  const refreshToken = {
    refreshToken: jwt.sign(user, process.env.REFRESH_TOKEN_SECRET as string),
  };

  const newRefreshToken = new RefreshTokenModel(refreshToken);
  await newRefreshToken.save();

  return refreshToken;
};

export const revokeRefreshToken = async (refreshToken: RefreshToken) => {
  await RefreshTokenModel.findOneAndDelete({ refreshToken: refreshToken.refreshToken });
};

export const verifyAccessToken = (token: Token, callback: jwt.VerifyCallback) => {
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, callback);
};
