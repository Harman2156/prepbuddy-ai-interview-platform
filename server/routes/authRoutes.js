const express =
require("express");

const {

  registerUser,

  loginUser,

  getUserById,
  

updateProfile,



} = require(
  "../controllers/authController"
);

const router =
express.Router();


// ============================
// REGISTER
// ============================

router.post(
  "/register",
  registerUser
);


// ============================
// LOGIN
// ============================

router.post(
  "/login",
  loginUser
);


// ============================
// GET USER BY ID
// ============================

router.get(
  "/user/:id",
  getUserById
);

//update
router.put(
  "/update/:id",
  updateProfile
);


module.exports =
router;