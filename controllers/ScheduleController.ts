import { Body, Get, Patch, Response, Route, Tags } from "tsoa";
import { getNotCompletedEvents, updateExistingEvents } from "../utils/EventUtils";
import UpdateExistingEventsRequest from "../requests/UpdateExistingEventsRequest";

@Route("admin/schedule")
@Tags("Admin", "Schedule")
export class ScheduleController {
  @Get("/")
  public async getNotCompletedEvents() {
    return await getNotCompletedEvents();
  }

  @Response(204)
  @Patch("/")
  public async updateExistingEvents(@Body() { events }: UpdateExistingEventsRequest) {
    await updateExistingEvents(events);
  }
}
