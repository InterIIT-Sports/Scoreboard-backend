import { Body, Path, Put, Response, Route, Tags } from "tsoa";

import SquashWomenScoreUpdateRequest from "../requests/SquashWomenScoreUpdateRequest";
import { updateScore } from "../utils/EventUtils";

@Route("events/squashwomen")
@Tags("Events", "SquashWomen")
export class SquashWomenController {
  @Put("/:id")
  @Response(204)
  public async updateScore(@Path("id") id: string, @Body() score: SquashWomenScoreUpdateRequest) {
    return await updateScore(id, score);
  }
}
