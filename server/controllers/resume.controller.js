const Resume = require("../models/resume.model");

// ✅ Add or update resume
const addResumeData = async (req, res) => {
  try {
    if (!req.body || !req.body.resumeData) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: resumeData",
      });
    }

    const { resumeData, templateType = "professional" } = req.body; // ✅ Template type receive karo
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    let existingResume = await Resume.findOne({ userId: id });

    if (existingResume) {
      existingResume.resumeData = resumeData;
      existingResume.templateType = templateType; // ✅ Template type save karo
      existingResume.updatedAt = new Date();
      await existingResume.save();

      return res.status(200).json({
        success: true,
        message: "Resume data updated successfully!",
        resumeId: existingResume._id,
        templateType: templateType // ✅ Response mein bhejo
      });
    } else {
      const newResume = new Resume({
        userId: id,
        resumeData,
        templateType: templateType // ✅ Template type save karo
      });

      await newResume.save();

      return res.status(201).json({
        success: true,
        message: "Resume data added successfully!",
        resumeId: newResume._id,
        templateType: templateType // ✅ Response mein bhejo
      });
    }
  } catch (error) {
    console.error("❌ Error in addResumeData:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// ✅ Get all resumes for a user
const getAllResumeData = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const resumeData = await Resume.find({ userId: id });

    return res.status(200).json({
      success: true,
      data: resumeData,
    });
  } catch (error) {
    console.error("❌ Error in getAllResumeData:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// ✅ Get single resume by resume ID (needed for your route)
const getResumeDataById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Resume ID is required",
      });
    }

    const resume = await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: resume,
    });
  } catch (error) {
    console.error("❌ Error in getResumeDataById:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// ✅ UPDATE TEMPLATE TYPE FOR RESUME
const updateTemplateType = async (req, res) => {
  try {
    const { id } = req.params;
    const { templateType } = req.body;

    console.log("🎨 Updating template for resume:", id, "to:", templateType);

    if (!id || !templateType) {
      return res.status(400).json({
        success: false,
        message: "Resume ID and template type are required",
      });
    }

    // Validate template type
    const validTemplates = ["professional", "modern"];
    if (!validTemplates.includes(templateType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid template type. Use 'professional' or 'modern'",
      });
    }

    const resume = await Resume.findByIdAndUpdate(
      id,
      { 
        templateType: templateType,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    );

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    console.log("✅ Template updated successfully for resume:", resume._id);

    return res.status(200).json({
      success: true,
      message: "Template updated successfully",
      data: {
        resumeId: resume._id,
        templateType: resume.templateType
      },
    });

  } catch (error) {
    console.error("❌ Error updating template:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating template",
      error: error.message,
    });
  }
};

module.exports = {
  addResumeData,
  getAllResumeData,
  getResumeDataById,
  updateTemplateType // ✅ Add this export
};