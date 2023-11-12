import { Body, Delete, Get, Post, Res, Response, Route, Tags } from "tsoa";
import DeleteUserRequest from "../requests/DeleteUserRequest";
import { createUserWithUsernameAndPassword, deleteUser, getAllUsers } from "../utils/AuthUtils";
import CreateUserWithUsernameAndPasswordRequest from "../requests/CreateUserWithUsernameAndPasswordRequest";

@Route("admin")
@Tags("Admin")
export class AdminController {
  @Get("users")
  public async getUsers() {
    return await getAllUsers();
  }

  @Delete("user")
  @Response(204)
  public async deleteUser(@Body() { username }: DeleteUserRequest) {
    await deleteUser(username);
  }

  @Post("createUserWithUsernameAndPassword")
  @Response(403, "Username already exists")
  public async createUserWithUsernameAndPassword(
    @Body() { name, username, password, role }: CreateUserWithUsernameAndPasswordRequest
  ) {
    return await createUserWithUsernameAndPassword(name, username, password, role);
  }
}
