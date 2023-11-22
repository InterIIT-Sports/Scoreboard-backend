import EventCatagories from "../types/EventCategories";
import EventModel from "../schemas/EventModel";

export const addEvent = async <T extends Event>(eventCatogory: EventCatagories, eventData: T) => {
  const eventModel = await EventModel.create<T>(eventData);
  await eventModel.save();
  return eventModel;
};

export const readEvents = async () => {
  return await EventModel.find();
};

export const deleteEvent = async (eventID: string) => {
  await EventModel.findByIdAndDelete(eventID);
};
