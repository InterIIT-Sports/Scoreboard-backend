import * as jwt from "jsonwebtoken";
import loginWithUsernameAndPasswordRequest from "../requests/loginWithUsernameAndPasswordRequest";
import accessTokenRequest from "../requests/accessTokenRequest";
import RefreshTokenModel from "../schemas/RefreshTokenModel";
import { Body, Controller, Delete, Example, Post, Response, Route, Tags } from "tsoa";
import { getAccessToken, getRefreshToken, loginWithUsernameAndPassword, revokeRefreshToken } from "../utils/AuthUtils";
import { Unauthorised } from "../utils/AuthErrors";
import { User } from "../types/User";

@Route("auth")
@Tags("Authentication")
export class AuthController extends Controller {
  /**
   * Logs in a user with their username and password.
   * @param {loginWithUsernameAndPasswordRequest} request - The request object containing the username and password.
   */
  @Post("loginWithUsernameAndPassword")
  @Response(403, "Invalid username or password")
  @Example({
    user: {
      name: "TestUser",
      role: "Admin",
    },
    accessToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJwYXNzd29yZCI6InRlc3QiLCJuYW1lIjoiS2FyYW4iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2OTk3ODIzMzcsImV4cCI6MTY5OTc4MjkzN30.fjakJ978Ps_QvAeGFuM71h_bRiX1vNon4712O5yHi3k",
    type: "Bearer",
    refreshToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJwYXNzd29yZCI6InRlc3QiLCJuYW1lIjoiS2FyYW4iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2OTk3ODIzMzd9.PEMFsfQLK4wjQ_Pf3_HxBH-RBZsCLuf72I57peEv1mM",
  })
  public async loginWithUsernameAndPassword(@Body() { username, password }: loginWithUsernameAndPasswordRequest) {
    return await loginWithUsernameAndPassword(username, password);
  }

  /**
   * Generates a new access and refresh token using the provided refresh token.
   * @param {accessTokenRequest} request - The request object containing the refresh token.
   * @throws {Unauthorised} - If the provided refresh token is invalid.
   */
  @Post("accessToken")
  @Response(403, "Invalid Refresh token")
  @Example({
    refreshToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJwYXNzd29yZCI6InRlc3QiLCJuYW1lIjoiS2FyYW4iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2OTk3NDA1NDl9.SX3TDJipA621FrpHBEJKnyKKEVbrbxbLziOHn8xIJUc",
  })
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

  /**
   * Logs out the user by revoking the provided refresh token.
   * @param refreshToken - The refresh token to revoke.
   */
  @Delete("logout")
  @Example({
    refreshToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJwYXNzd29yZCI6InRlc3QiLCJuYW1lIjoiS2FyYW4iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2OTk3ODIzMzd9.PEMFsfQLK4wjQ_Pf3_HxBH-RBZsCLuf72I57peEv1mM",
  })
  public logout(@Body() { refreshToken }: accessTokenRequest) {
    revokeRefreshToken({ refreshToken });
  }
}
