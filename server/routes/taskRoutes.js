const router = require("express").Router();
const Task = require("../models/Task");
const Lead = require("../models/Lead");
const authMiddleware = require("../middleware/AuthMiddleware");

router.post("/", authMiddleware, async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("lead", "name")
      .populate("assignedTo", "name");

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id/status", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.assignedTo.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Only assigned user can update task"
      });
    }

    task.status = req.body.status;
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/dashboard/stats", authMiddleware, async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments({
      isDeleted: false
    });

    const qualifiedLeads = await Lead.countDocuments({
      status: "Qualified",
      isDeleted: false
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const tasksDueToday = await Task.countDocuments({
      dueDate: { $gte: today, $lt: tomorrow }
    });

    const completedTasks = await Task.countDocuments({
      status: "Completed"
    });

    res.json({
      totalLeads,
      qualifiedLeads,
      tasksDueToday,
      completedTasks
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;