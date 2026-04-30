const router = require("express").Router();
const Company = require("../models/Company");
const Lead = require("../models/lead");
const authMiddleware = require("../middleware/AuthMiddleware");

router.post("/", authMiddleware, async (req, res) => {
  try {
    const company = await Company.create(req.body);
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    const leads = await Lead.find({
      company: req.params.id,
      isDeleted: false
    }).populate("assignedTo", "name");

    res.json({ company, leads });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;