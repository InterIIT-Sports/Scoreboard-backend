import EventCatagories from "../types/EventCategories";
import EventModel from "../schemas/EventModel";
import AllEvents from "../types/AllEvents";
import Event from "../types/Event";

export const addEvent = async <T extends Event>(eventCatogory: EventCatagories, eventData: T) => {
  const eventModel = await EventModel.create<T>(eventData);
  await eventModel.save();
  return eventModel;
};

export const readEvents = async () => {
  return await EventModel.find<AllEvents>().populate("teams");
};

export const deleteEvent = async (eventID: string) => {
  await EventModel.findByIdAndDelete(eventID);
};

export const getLiveEvents = async () => {
  return await EventModel.find<AllEvents>().where("isStarted").equals(true);
};

export const getEventByID = async <T extends Event>(id: string) => {
  return await EventModel.findById<T>(id);
};

export const toggleEventStarted = async (id: string) => {
  const event = await getEventByID<AllEvents>(id);
  return await EventModel.findByIdAndUpdate(id, { isStarted: !event?.isStarted });
};
