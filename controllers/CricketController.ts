import { Body, Path, Put, Response, Route, Tags } from "tsoa";

import CricketScoreUpdateRequest from "../requests/CricketScoreUpdateRequest";
import { updateScore } from "../utils/EventUtils";

@Route("events/cricket")
@Tags("Events", "Cricket")
export class CricketController {
  @Put("/:id")
  @Response(204)
  public async updateScore(@Path("id") id: string, @Body() score: CricketScoreUpdateRequest) {
    return await updateScore(id, score);
  }
}
