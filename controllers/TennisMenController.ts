import { Body, Path, Put, Response, Route, Tags } from "tsoa";

import TennisMenScoreUpdateRequest from "../requests/TennisMenScoreUpdateRequest";
import { updateScore } from "../utils/EventUtils";

@Route("events/tennismen")
@Tags("Events", "TennisMen")
export class TennisMenController {
  @Put("/:id")
  @Response(204)
  public async updateScore(@Path("id") id: string, @Body() score: TennisMenScoreUpdateRequest) {
    return await updateScore(id, score);
  }
}
