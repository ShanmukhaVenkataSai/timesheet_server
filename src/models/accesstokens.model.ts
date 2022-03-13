import mongoose from "mongoose";

const accesstokens = new mongoose.Schema(
  {
    accesstoken: {
      type: String,
      required: true,
    },
    ttl: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("accesstokens", accesstokens);
