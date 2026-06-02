
const Resume =
require("../models/Resume");



const uploadResume =
async (req, res) => {

  try {

    console.log(
      "REQ FILE:",
      req.file
    );



    if (!req.file) {

      return res.status(400).json({

        message:
          "No file uploaded",
      });
    }



    const {
      user,
      atsScore,
    } = req.body;



    const resume =
      await Resume.create({

        user,

        filename:
          req.file.originalname,

resumeUrl:
  `http://localhost:5000/uploads/${req.file.filename}`,


        atsScore,
      });



    res.status(201).json({

      success: true,

      resume,
    });

  } catch (error) {

    console.log(
      "UPLOAD ERROR:",
      error
    );

    res.status(500).json({

      message:
        error.message,
    });
  }
};





const getUserResumes =
async (req, res) => {

  try {

    const resumes =
      await Resume.find({

        user:
          req.params.userId,
      });




    res.status(200).json({

      success: true,

      resumes,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        error.message,
    });
  }
};





const deleteResume =
async (req, res) => {

  try {

    await Resume.findByIdAndDelete(

      req.params.id
    );



    res.status(200).json({

      success: true,

      message:
        "Resume deleted successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        error.message,
    });
  }
};





module.exports = {

  uploadResume,

  getUserResumes,

  deleteResume,
};
