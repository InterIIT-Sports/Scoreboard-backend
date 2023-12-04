import { Body, Delete, Get, Post, Res, Response, Route, Tags } from "tsoa";
import DeleteUserRequest from "../requests/DeleteUserRequest";
import { createUserWithUsernameAndPassword, deleteUser, getAllUsers } from "../utils/AuthUtils";
import CreateUserWithUsernameAndPasswordRequest from "../requests/CreateUserWithUsernameAndPasswordRequest";

@Route("admin")
@Tags("Admin")
export class AdminController {
  /**
   * Retrieves all users from the database.
   */
  @Get("users")
  public async getUsers() {
    return await getAllUsers();
  }

  /**
   * Deletes a user with the given username.
   * @param {DeleteUserRequest} request - The request object containing the username of the user to be deleted.
   */
  @Delete("user")
  @Response(204)
  public async deleteUser(@Body() { username }: DeleteUserRequest) {
    await deleteUser(username);
  }

  /**
   * Creates a new user with the given name, username, password, and role.
   * @param {CreateUserWithUsernameAndPasswordRequest} request - The request object containing name, username, password, and role.
   */
  @Post("createUserWithUsernameAndPassword")
  @Response(403, "Username already exists")
  public async createUserWithUsernameAndPassword(@Body() { name, username, password, role }: CreateUserWithUsernameAndPasswordRequest) {
    return await createUserWithUsernameAndPassword(name, username, password, role);
  }
}
