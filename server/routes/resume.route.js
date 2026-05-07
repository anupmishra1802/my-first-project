const express = require("express");
const {
  addResumeData,
  getAllResumeData,
  getResumeDataById,
  updateTemplateType // ✅ Add this import
} = require("../controllers/resume.controller");
const verifyUser = require("../utils/verifyUser");

const router = express.Router();

// ✅ Add or update resume
router.post("/resume-data", verifyUser, addResumeData);

// ✅ Get all resumes for a user
router.get("/get-all-resume-data", verifyUser, getAllResumeData);

// ✅ Get single resume by ID
router.get("/get-resume/:id", verifyUser, getResumeDataById);

// ✅ Update template type for resume (NEW ROUTE)
router.put("/update-template/:id", verifyUser, updateTemplateType);

module.exports = router;