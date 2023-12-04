import { Body, Delete, Get, Path, Post, Route, Tags } from "tsoa";

import CreateTeamRequest from "../requests/CreateTeamRequest";
import { addTeam, deleteTeam, getAllTeams } from "../utils/TeamUtils";

@Route("admin/teams")
@Tags("Teams")
export class TeamControllers {
  /**
   * Retrieves all teams.
   */
  @Get("")
  public async getAllTeams() {
    return await getAllTeams();
  }

  /**
   * Adds a team.
   *
   * @param name - The name of the team.
   */
  @Post("")
  public async addTeam(@Body() { name }: CreateTeamRequest) {
    await addTeam(name);
  }

  /**
   * Deletes a team.
   * @param id - The ID of the team to be deleted.
   */
  @Delete("/:id")
  public async deleteTeam(@Path("id") id: string) {
    await deleteTeam(id);
  }
}
