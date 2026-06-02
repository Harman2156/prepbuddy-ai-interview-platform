const express = require("express");

const {

  generateQuestions,

  generateResumeQuestions,

  analyzeResume,

  evaluateAnswer,

  saveInterview,

  getInterviews,

  getLatestInterview,

} = require(
  "../controllers/interviewController"
);

const upload =
require("../middleware/uploadMiddleware");

const router = express.Router();


// ROLE-BASED QUESTIONS
router.post(
  "/generate",
  generateQuestions
);


// RESUME-BASED QUESTIONS
router.post(

  "/generate-resume",

  upload.single("resume"),

  generateResumeQuestions
);


// EVALUATE ANSWER
router.post(
  "/evaluate",
  evaluateAnswer
);


// SAVE INTERVIEW
router.post(
  "/save",
  saveInterview
);


// GET INTERVIEW HISTORY
router.get(
  "/history",
  getInterviews
);
router.post(

  "/analyze-resume",

  upload.single("resume"),

  analyzeResume
);
router.get(
  "/latest/:userId",
  getLatestInterview
);
module.exports = router;