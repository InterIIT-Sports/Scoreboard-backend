import { Body, Get, Post, Route } from "tsoa";
import { loginWithUsernameAndPassword } from "../utils/AuthUtils";

@Route("auth")
export default class AuthController {
  @Post("loginWithUsernameAndPassword")
  public async loginWithUsernameAndPassword(@Body() { username, password }: { username: string; password: string }) {
    return loginWithUsernameAndPassword(username, password);
  }
}
