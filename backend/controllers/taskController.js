import Task from "../models/Task.js";
import ActionLog from "../models/ActionLog.js";
import User from "../models/User.js";
import { getIO } from "../socket.js";
import sendEmail from "../utils/sendEmail.js";

//  GET TASKS
export const getTasks = async (req, res) => {
  const tasks = await Task.find().populate("assignedTo", "fullName");
  res.json(tasks);
};

//  CREATE TASK
export const createTask = async (req, res) => {
  const { title, description, priority, dueDate, assignedTo } = req.body;

  const existing = await Task.findOne({ title });
  if (existing) return res.status(400).json({ error: "Duplicate task title" });

  const task = await Task.create({
    title,
    description,
    priority,
    dueDate,
    assignedTo,
    createdBy: req.user.id,
  });

  const log = await ActionLog.create({
    message: `Task '${title}' created`,
    user: req.user.id,
  });

  const io = getIO();
  io.emit("task-updated", task);
  io.emit("new-log", log);

  res.status(201).json(task);
};

//  UPDATE TASK (drag-drop)
export const updateTask = async (req, res) => {
  console.log(" Update Request: ID=", req.params.id, "Body=", req.body);
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const oldStatus = task.status;
    task.status = req.body.status;
    await task.save();

    const io = getIO();
    io.emit("task-updated", task);

    if (oldStatus !== req.body.status) {
      const log = await ActionLog.create({
        message: `Task '${task.title}' moved to '${task.status}'`,
        user: req.user.id,
      });
      io.emit("new-log", log);
    }

    res.json(task);
  } catch (err) {
    console.error(" Error Updating Task:", err.message);
    res.status(500).json({ message: "Error updating task", error: err.message });
  }
};

// ✅ SMART ASSIGN
export const smartAssign = async (req, res) => {
  const { id } = req.params;
  const users = await User.find();

  let minUser = null;
  let minCount = Infinity;

  for (const user of users) {
    const count = await Task.countDocuments({
      assignedTo: user._id,
      status: { $ne: "Done" },
    });
    if (count < minCount) {
      minCount = count;
      minUser = user;
    }
  }

  const task = await Task.findByIdAndUpdate(
    id,
    { assignedTo: minUser._id },
    { new: true }
  );

  const log = await ActionLog.create({
    message: `Task '${task.title}' assigned to ${minUser.fullName}`,
    user: req.user.id,
  });

  const io = getIO();
  io.emit("task-updated", task);
  io.emit("new-log", log);

  if (minUser.email) {
    await sendEmail(
      minUser.email,
      "New Task Assigned",
      `<p>Hi ${minUser.fullName},</p><p>You have a new task: <strong>${task.title}</strong></p>`
    );
  }

  res.json(task);
};
