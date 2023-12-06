import { Body, Path, Put, Response, Route, Tags } from "tsoa";

import TennisWomenScoreUpdateRequest from "../requests/TennisWomenScoreUpdateRequest";
import { updateScore } from "../utils/EventUtils";

@Route("events/tenniswomen")
@Tags("Events", "TennisWomen")
export class TennisWomenController {
  @Put("/:id")
  @Response(204)
  public async updateScore(@Path("id") id: string, @Body() score: TennisWomenScoreUpdateRequest) {
    return await updateScore(id, score);
  }
}
