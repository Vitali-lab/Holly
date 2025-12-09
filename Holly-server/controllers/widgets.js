import { Widgets } from "../models/Widgets.js";

export const fetchWidgets = async () => {
  return await Widgets.find();
};

export const addWidget = async (widget) => {
  return await Widgets.create(widget);
};

export const deleteWidget = async (id) => {
  return await Widgets.findByIdAndDelete(id);
};

export const editWidget = async (id, widget) => {
  return await Widgets.findByIdAndUpdate(id, widget, {
    returnDocument: "after",
    runValidators: true,
  });
};
