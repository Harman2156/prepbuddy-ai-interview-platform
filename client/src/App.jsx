import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Profile from "./pages/Profile";
import Home from "./pages/Home";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";

import Interview from "./pages/Interview";

import Result from "./pages/Result";

import MyResumes from "./pages/MyResumes";

import AIFeedback from "./pages/AIFeedback";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* HOME PAGE */}
        <Route
  path="/"
  element={<Home />}
/>

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* INTERVIEW */}
        <Route
          path="/interview"
          element={<Interview />}
        />

        {/* RESULT */}
        <Route
          path="/result"
          element={<Result />}
        />

        {/* MY RESUMES */}
        <Route
          path="/my-resumes"
          element={<MyResumes />}
        />

        {/* AI FEEDBACK */}
        <Route
          path="/ai-feedback"
          element={<AIFeedback />}
        />
        <Route
  path="/dashboard"
  element={<Dashboard />}
/>

<Route
  path="/profile"
  element={<Profile />}
/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;