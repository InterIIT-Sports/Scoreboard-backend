import { Get, Post, Request, Response, Route } from "tsoa";

import { getAccessToken, getRefreshToken, loginWithUsernameAndPassword } from "../utils/AuthUtils";

@Route("auth")
export default class AuthController {
  @Post("loginWithUsernameAndPassword")
  public async loginWithUsernameAndPassword(@Request() req: Express.Request, @Response("403") res: Express.Response) {}
}
