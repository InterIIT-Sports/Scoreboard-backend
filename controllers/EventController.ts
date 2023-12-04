import { Get, Patch, Path, Response, Route, Tags } from "tsoa";
import { readEvents, toggleEventStarted } from "../utils/EventUtils";

@Route("events")
@Tags("Events")
export class EventController {
  @Patch("toggleLive/:id")
  @Response(204)
  public async toggleLive(@Path("id") id: string) {
    await toggleEventStarted(id);
  }

  @Get("/")
  public async getAllEvents() {
    return await readEvents();
  }
}
