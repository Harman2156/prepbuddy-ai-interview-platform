const Resume = require("../models/Resume");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const uploadResume = async (req, res) => {
  try {
    console.log("REQ FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const { user, atsScore } = req.body;

    // Upload PDF to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "raw",
          folder: "PrepBuddy_Resumes",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    // Save Resume in MongoDB
    const resume = await Resume.create({
      user,
      filename: req.file.originalname,
      resumeUrl: uploadResult.secure_url,
      atsScore,
    });

    res.status(201).json({
      success: true,
      resume,
    });
  } catch (error) {
    console.log("UPLOAD ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({
      user: req.params.userId,
    });

    res.status(200).json({
      success: true,
      resumes,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteResume = async (req, res) => {
  try {
    await Resume.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  uploadResume,
  getUserResumes,
  deleteResume,
};