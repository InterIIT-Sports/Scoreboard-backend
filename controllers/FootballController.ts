import { Body, Path, Put, Response, Route, Tags } from "tsoa";

import FootballScoreUpdateRequest from "../requests/FootballScoreUpdateRequest";
import { updateScore } from "../utils/EventUtils";

@Route("events/football")
@Tags("Events", "Football")
export class FootballController {
  @Put("/:id")
  @Response(204)
  public async updateScore(@Path("id") id: string, @Body() score: FootballScoreUpdateRequest) {
    return await updateScore(id, score);
  }
}
