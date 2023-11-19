import { Body, Delete, Get, Path, Post, Route, Tags } from "tsoa";
import { addTeam, deleteTeam, getAllTeams } from "../utils/TeamUtils";
import CreateTeamRequest from "../requests/CreateTeamRequest";

@Route("admin/teams")
@Tags("Teams")
export class TeamControllers {
  @Get("")
  public async getAllTeams() {
    return await getAllTeams();
  }

  @Post("")
  public async addTeam(@Body() { name }: CreateTeamRequest) {
    await addTeam(name);
  }

  @Delete("/:id")
  public async deleteTeam(@Path("id") id: string) {
    await deleteTeam(id);
  }
}
