const upload =
require("../middleware/upload");

const express =
require("express");

const {

  uploadResume,

  getUserResumes,

  deleteResume,

} = require(

  "../controllers/resumeController"
);

const router =
express.Router();




// ======================================
// UPLOAD RESUME
// ======================================

router.post(

  "/upload",

  upload.single(
    "resume"
  ),

  uploadResume
);




// ======================================
// GET USER RESUMES
// ======================================

router.get(

  "/:userId",

  getUserResumes
);




// ======================================
// DELETE RESUME
// ======================================

router.delete(

  "/:id",

  deleteResume
);




module.exports =
router;

