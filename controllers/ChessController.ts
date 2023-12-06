import { Body, Path, Put, Response, Route, Tags } from "tsoa";

import ChessScoreUpdateRequest from "../requests/ChessScoreUpdateRequest";
import { updateScore } from "../utils/EventUtils";

@Route("events/chess")
@Tags("Events", "Chess")
export class ChessController {
  @Put("/:id")
  @Response(204)
  public async updateScore(@Path("id") id: string, @Body() score: ChessScoreUpdateRequest) {
    return await updateScore(id, score);
  }
}
