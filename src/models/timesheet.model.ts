import mongoose from "mongoose";

const timesheets = new mongoose.Schema(
  {
    datetime: {
      type: Date,
      required: true,
    },
    date: {
      type: String,
      required: false,
    },
    checked: {
      type: Boolean,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
    },
    value: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("timesheets", timesheets);
