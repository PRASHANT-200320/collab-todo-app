import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    message: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const ActionLog = mongoose.model("ActionLog", logSchema);
export default ActionLog;
