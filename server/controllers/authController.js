
const User =
require("../models/User");

const bcrypt =
require("bcryptjs");

const jwt =
require("jsonwebtoken");


// ======================================
// REGISTER USER
// ======================================

const registerUser =
async (req, res) => {

  try {

    const {
      name,
      email,
      password,
    } = req.body;


    // CHECK EXISTING USER

    const userExists =
      await User.findOne({

        email,
      });

    if (userExists) {

      return res.status(400).json({

        message:
          "User already exists",
      });
    }


    // HASH PASSWORD

    const hashedPassword =
      await bcrypt.hash(

        password,
        10
      );


    // CREATE USER

    const user =
      await User.create({

        name,

        email,

        password:
          hashedPassword,

        totalInterviews: 0,

        averageScore: 0,

        bestScore: 0,
      });


    res.status(201).json({

      success: true,

      message:
        "User registered successfully",

      user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        error.message,
    });
  }
};


// ======================================
// LOGIN USER
// ======================================

const loginUser =
async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;


    // FIND USER

    const user =
      await User.findOne({

        email,
      });

    if (!user) {

      return res.status(400).json({

        message:
          "Invalid credentials",
      });
    }


    // COMPARE PASSWORD

    const isMatch =
      await bcrypt.compare(

        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({

        message:
          "Invalid credentials",
      });
    }


    // GENERATE TOKEN

    const token =
      jwt.sign(

        {
          id: user._id,
        },

        "secretkey",

        {
          expiresIn: "7d",
        }
      );


    res.status(200).json({

      success: true,

      message:
        "Login successful",

      token,

      user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        error.message,
    });
  }
};


const updateProfile =
async (req, res) => {

  try {

    const {
      name,
      email,
    } = req.body;


    const updatedUser =
      await User.findByIdAndUpdate(

        req.params.id,

        {
          name,
          email,
        },

        {
          new: true,
        }
      ).select("-password");


    res.status(200).json({

      success: true,

      message:
        "Profile updated successfully",

      user: updatedUser,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        error.message,
    });
  }
};

// ======================================
// GET USER BY ID
// ======================================

const getUserById =
async (req, res) => {

  try {

    const user =
      await User.findById(

        req.params.id

      ).select("-password");


    if (!user) {

      return res.status(404).json({

        message:
          "User not found",
      });
    }


    res.status(200).json({

      success: true,

      user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        error.message,
    });
  }
};


// ======================================
// EXPORTS
// ======================================

module.exports = {

  registerUser,

  loginUser,

  getUserById,

  updateProfile,
};
