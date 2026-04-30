const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    lead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead"
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    dueDate: Date,
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);