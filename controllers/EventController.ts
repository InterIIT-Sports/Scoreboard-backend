import { Body, Example, Get, Patch, Path, Post, Put, Response, Route, Tags } from "tsoa";

import { readEvents, setWinner, toggleEventStarted, updateScore } from "../utils/EventUtils";
import TennisMenScoreUpdateRequest from "../requests/TennisMenScoreUpdateRequest";
import TennisWomenScoreUpdateRequest from "../requests/TennisWomenScoreUpdateRequest";
import ChessScoreUpdateRequest from "../requests/ChessScoreUpdateRequest";
import SquashMenScoreUpdateRequest from "../requests/SquashMenScoreUpdateRequest";
import SquashWomenScoreUpdateRequest from "../requests/SquashWomenScoreUpdateRequest";
import FootballScoreUpdateRequest from "../requests/FootballScoreUpdateRequest";
import { AllScores } from "../types/AllEvents";
import { Winner } from "../types/Event";

@Route("events")
@Tags("Events")
export class EventController {
  /**
   * Toggles the live status of an event.
   * @param id - The ID of the event to toggle.
   */
  @Patch("toggleLive/:id")
  @Response(204)
  public async toggleLive(@Path("id") id: string) {
    await toggleEventStarted(id);
  }

  /**
   * Retrieves all events.
   * @returns {Promise<Event[]>} A promise that resolves to an array of events.
   */
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

  /**
   * Updates the score for a specific event.
   * @param id - The ID of the event.
   * @param score - The updated score for the event.
   * @returns A promise that resolves to the updated score.
   */
  @Put("/:id")
  @Response(204)
  public async updateScore(@Path("id") id: string, @Body() score: AllScores) {
    return await updateScore(id, score);
  }

  /**
   * Sets the winner of an event.
   *
   * @param id - The ID of the event.
   * @param winner - The winner object containing the team and participants.
   */
  @Post("/:id/winner")
  @Response(204)
  public async setWinner(@Path("id") id: string, @Body() winner: Winner) {
    await setWinner(id, winner.team, winner.participants);
  }
}
