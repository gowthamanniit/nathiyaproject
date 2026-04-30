const router = require("express").Router();
const Lead = require("../models/Lead");
const authMiddleware = require("../middleware/AuthMiddleware");

router.post("/", authMiddleware, async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 5;
    const search = req.query.search || "";
    const status = req.query.status || "";

    let query = {
      isDeleted: false,
      name: { $regex: search, $options: "i" }
    };

    if (status) {
      query.status = status;
    }

    const leads = await Lead.find(query)
      .populate("assignedTo", "name")
      .populate("company", "name")
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Lead.countDocuments(query);

    res.json({
      leads,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Lead.findByIdAndUpdate(req.params.id, {
      isDeleted: true
    });

    res.json({ message: "Lead soft deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;