import { Example, Get, Patch, Path, Response, Route, Tags } from "tsoa";
import { readEvents, toggleEventStarted } from "../utils/EventUtils";
import mongoose from "mongoose";

@Route("events")
@Tags("Events")
export class EventController {
  @Patch("toggleLive/:id")
  @Response(204)
  public async toggleLive(@Path("id") id: string) {
    await toggleEventStarted(id);
  }

  @Get("/")
  @Example([
    {
      _id: new mongoose.Types.ObjectId("655e5cad5d79240e556d346f"),
      title: "Test football match",
      endTime: 1700682925540,
      startTime: 1700682925540,
      event: "Football",
      isStarted: true,
      roomID: "Football",
      teams: [
        new mongoose.Types.ObjectId("655e4dbdbddc0c9ed41ad774"),
        new mongoose.Types.ObjectId("655e4dc8992db97369908276"),
      ],
      teamA_score: 0,
      teamB_score: 0,
      __v: 0,
    },
  ])
  public async getAllEvents() {
    return await readEvents();
  }
}
