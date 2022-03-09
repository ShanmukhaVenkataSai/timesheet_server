import mongoose from "mongoose";

const timesheets = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    hours: {
      type: Number,
      required: true,
    },
    minutes: {
      type: Number,
      required: true,
    },
    timezone: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("timesheets", timesheets);
