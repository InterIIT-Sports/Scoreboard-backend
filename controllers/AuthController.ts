import * as jwt from "jsonwebtoken";
import loginWithUsernameAndPasswordRequest from "../requests/loginWithUsernameAndPasswordRequest";
import accessTokenRequest from "../requests/accessTokenRequest";
import RefreshTokenModel from "../schemas/RefreshTokenModel";
import { Body, Delete, Get, Post, Response, Route } from "tsoa";
import { getAccessToken, getRefreshToken, loginWithUsernameAndPassword, revokeRefreshToken } from "../utils/AuthUtils";
import { Unauthorised } from "../utils/AuthErrors";
import { User } from "../types/User";

@Route("auth")
export default class AuthController {
  @Post("loginWithUsernameAndPassword")
  public async loginWithUsernameAndPassword(@Body() { username, password }: loginWithUsernameAndPasswordRequest) {
    return loginWithUsernameAndPassword(username, password);
  }

  @Post("accessToken")
  public async accessToken(@Body() { refreshToken }: accessTokenRequest) {
    const tokenExists = await RefreshTokenModel.findOne({ refreshToken });

    if (!tokenExists) throw Unauthorised;

    let user = jwt.verify(refreshToken as string, process.env.REFRESH_TOKEN_SECRET as string);
    user = user as User;
    delete user?.iat;
    const accessToken = getAccessToken(user as User);
    const newRefreshToken = await getRefreshToken(user as User);
    await revokeRefreshToken({ refreshToken });
    return { ...accessToken, refreshToken: newRefreshToken.refreshToken };
  }

  @Delete("logout")
  public logout(@Body() { refreshToken }: accessTokenRequest) {
    revokeRefreshToken({ refreshToken });
  }
}
