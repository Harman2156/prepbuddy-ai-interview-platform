const fs = require("fs");
const path = require("path");

const uploadPath = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}
const path =
require("path");


const express =
require("express");

const cors =
require("cors");

const dotenv =
require("dotenv");

const connectDB =
require("./config/db");



// ROUTES
const authRoutes =
require("./routes/authRoutes");

const interviewRoutes =
require("./routes/interviewRoutes");

const resumeRoutes =
require("./routes/resumeRoutes");



dotenv.config();

connectDB();

const app =
express();



// MIDDLEWARES
app.use(cors());

app.use(express.json());


app.use(

  "/uploads",

  express.static(

    path.join(
      __dirname,
      "uploads"
    )
  )
);





// ======================================
// ROUTES
// ======================================

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/interview",
  interviewRoutes
);

app.use(
  "/api/resume",
  resumeRoutes
);




// TEST ROUTE
app.get("/", (req, res) => {

  res.send(
    "Backend Server Running"
  );
});




// PORT
const PORT =
5000;



app.listen(PORT, () => {

  console.log(

    `Server running on port ${PORT}`
  );
});
