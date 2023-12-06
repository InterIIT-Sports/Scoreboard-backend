import { Body, Path, Put, Response, Route, Tags } from "tsoa";

import SquashMenScoreUpdateRequest from "../requests/SquashMenScoreUpdateRequest";
import { updateScore } from "../utils/EventUtils";

@Route("events/squashmen")
@Tags("Events", "SquashMen")
export class SquashMenController {
  @Put("/:id")
  @Response(204)
  public async updateScore(@Path("id") id: string, @Body() score: SquashMenScoreUpdateRequest) {
    return await updateScore(id, score);
  }
}
