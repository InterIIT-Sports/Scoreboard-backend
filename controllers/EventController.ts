import { Example, Get, Patch, Path, Response, Route, Tags } from "tsoa";

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
  @Example([
    {
      _id: "string",
      subtitle: "string",
      title: "string",
      event: "Football",
      isStarted: true,
      startTime: 0,
      endTime: 0,
      teams: ["string"],
      score: {
        teamA_score: 0,
        teamB_score: 0,
      },
      isCompleted: true,
      winner: {
        team: "string",
      },
    },
    {
      _id: "string",
      subtitle: "string",
      title: "string",
      event: "Chess",
      isStarted: true,
      startTime: 0,
      endTime: 0,
      teams: ["string"],
      score: {
        teamA_points: 0,
        teamB_points: 0,
      },
      isCompleted: true,
      winner: {
        participants: ["string"],
        team: "string",
      },
    },
    {
      _id: "string",
      subtitle: "string",
      title: "string",
      event: "Cricket",
      isStarted: true,
      startTime: 0,
      endTime: 0,
      teams: ["string"],
      score: {
        teamA_runs: 0,
        teamA_overs: 0,
        teamA_wickets: 0,
        teamB_runs: 0,
        teamB_overs: 0,
        teamB_wickets: 0,
      },
      isCompleted: true,
      winner: {
        team: "string",
      },
    },
    {
      _id: "string",
      subtitle: "string",
      title: "string",
      event: "Squash_men",
      isStarted: true,
      startTime: 0,
      endTime: 0,
      teams: ["string"],
      score: {
        teamA_points: 0,
        teamB_points: 0,
      },
      isCompleted: true,
      winner: {
        participants: ["string"],
        team: "string",
      },
    },
    {
      _id: "string",
      subtitle: "string",
      title: "string",
      event: "Squash_women",
      isStarted: true,
      startTime: 0,
      endTime: 0,
      teams: ["string"],
      score: {
        teamA_points: 0,
        teamB_points: 0,
      },
      isCompleted: true,
      winner: {
        participants: ["string"],
        team: "string",
      },
    },
    {
      _id: "string",
      subtitle: "string",
      title: "string",
      event: "Tennis_men",
      isStarted: true,
      startTime: 0,
      endTime: 0,
      teams: ["string"],
      score: {
        teamA_points: 0,
        teamB_points: 0,
      },
      isCompleted: true,
      matchType: "Doubles",
      winner: {
        participants: ["string"],
        team: "string",
      },
    },
    {
      _id: "string",
      subtitle: "string",
      title: "string",
      event: "Tennis_women",
      isStarted: true,
      startTime: 0,
      endTime: 0,
      teams: ["string"],
      score: {
        teamA_points: 0,
        teamB_points: 0,
      },
      isCompleted: true,
      matchType: "Doubles",
      winner: {
        participants: ["string"],
        team: "string",
      },
    },
  ])
  public async getAllEvents() {
    return await readEvents();
  }
}
