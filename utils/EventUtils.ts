import mongoose from "mongoose";

import EventCatagories from "../types/EventCategories";
import EventModel from "../schemas/EventModel";
import AllEvents, { AllScores } from "../types/AllEvents";
import Event, { Score } from "../types/Event";
import { SocketServer } from "../types/SocketServer";
import { createFootballDefaultScore } from "../types/FootballEvent";
import { createChessDefaultScore } from "../types/ChessEvent";

export const getEventDefaultScore = (eventCatagory: EventCatagories) => {
  switch (eventCatagory) {
    case EventCatagories.FOOTBALL:
      return createFootballDefaultScore;
    case EventCatagories.CHESS:
      return createChessDefaultScore;
    case EventCatagories.CRICKET:
    case EventCatagories.SQUASH_MEN:
    case EventCatagories.SQUASH_WOMEN:
    case EventCatagories.TENNIS_WOMEN:
    case EventCatagories.TENNIS_MEN:
    case EventCatagories.ATHLETICS:
      return () => {};
  }
};

export const addEvent = async <T extends Event<U>, U extends Score>(eventCatogory: EventCatagories, eventData: T) => {
  const eventModel = await EventModel.create<T>({
    ...eventData,
    teams: eventData.teams.map(team => new mongoose.Types.ObjectId(team)),
    isCompleted: false,
    isStarted: false,
    score: getEventDefaultScore(eventCatogory)(),
  });
  await eventModel.save();
  return eventModel;
};

export const readEvents = async () => {
  return (await EventModel.find<AllEvents>().populate("teams")).map(event => event as AllEvents);
};

export const deleteEvent = async (eventID: string) => {
  await EventModel.findByIdAndDelete(eventID);
};

export const getLiveEvents = async () => {
  return await EventModel.find<AllEvents>().where("isStarted").equals(true);
};

export const getEventByID = async <T extends Event<U>, U extends Score>(id: string) => {
  return await EventModel.findById<T>(id);
};

export const toggleEventStarted = async (id: string) => {
  const event = await getEventByID<AllEvents, AllScores>(id);
  if (event?.isStarted) await markEventAsCompleted(id);
  SocketServer.io.sockets.emit("eventStartOrEnd", JSON.stringify({ eventID: event?._id, isStarted: !event?.isStarted }));
  return await EventModel.findByIdAndUpdate(id, { isStarted: !event?.isStarted });
};

export const markEventAsCompleted = async (id: string) => {
  return await EventModel.findByIdAndUpdate(id, { isCompleted: true });
};

export const updateScore = async (id: string, score: any) => {
  const event = await getEventByID<AllEvents, AllScores>(id);
  if (event && event.isStarted) SocketServer.io.sockets.in(event.roomID).emit(`scoreUpdate/${event.roomID}`, JSON.stringify(score));
  await EventModel.findByIdAndUpdate(id, { score });
};

export const deleteNotCompletedEvents = async () => {
  return await EventModel.deleteMany({ isCompleted: false });
};

export const addNewEvents = async (events: AllEvents[]) => {
  events.forEach(async event => addEvent(event.event, event));
};
