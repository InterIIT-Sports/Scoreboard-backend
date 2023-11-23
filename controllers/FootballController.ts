import { Body, Delete, Get, Post, Put, Route, Tags } from "tsoa";
import CreateUserWithUsernameAndPasswordRequest from "../requests/CreateUserWithUsernameAndPasswordRequest";
import DeleteUserRequest from "../requests/DeleteUserRequest";
import { getAllUsers, deleteUser, createUserWithUsernameAndPassword } from "../utils/AuthUtils";

@Route("events/football")
@Tags("Events", "Football")
export class AdminController {
  @Put("/")
  public updateScore() {}
}
