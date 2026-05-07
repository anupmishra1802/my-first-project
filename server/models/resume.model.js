const mongoose = require("mongoose");

// 🎯 Profile Schema
const profileSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  mobile: String,
  aboutMe: String,
  address: String,
  linkedIn: String,
  github: String,
  codechef: String,
  leetcode: String,
  codeforces: String,
});

// 🎓 Education Schema
const educationSchema = new mongoose.Schema({
  college: String,
  year: String,
  field: String,
  branch: String,
  startYear: String,
  endYear: String,
  city: String,
  grades: String,
  higherCollege: String,
  startYear2: String,
  endYear2: String,
  city2: String,
  percentage: String,
  board1: String,
  school: String,
  startYear3: String,
  endYear3: String,
  city3: String,
  percentage2: String,
  board2: String,
});

// 💻 Project Schema
const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  link: String,
  techStack: String,
});

// 🏢 Experience Schema
const experienceSchema = new mongoose.Schema({
  role: String,
  institute: String,
  start_date: String,
  end_date: String,
  desc: String,
});

// ⭐ Extra Details Schema
const extraDetailsSchema = new mongoose.Schema({
  skills: {
    languages: [String],
    web: [String],
    webFrameworks: [String],
    databases: [String],
    other: [String],
  },
  achievements: [String],
  extraCoCurricular: [String],
  coreSubjects: [String],
});

// 📄 Main Resume Schema
const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resumeData: {
      profile: profileSchema,
      education: [educationSchema],
      projects: [projectSchema],
      experience: [experienceSchema],
      extraDetails: extraDetailsSchema,
    },
  },
  { timestamps: true }
);

// ✅ Create & Export Model
const Resume = mongoose.model("Resumes", resumeSchema);
module.exports = Resume;
