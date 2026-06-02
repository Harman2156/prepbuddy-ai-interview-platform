import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import { registerUser } from "../services/authService";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const data = await registerUser(formData);

      alert(data.message);

      navigate("/login");

    } catch (error) {

      alert(
        error.response.data.message
      );

    }
  };

  return (
    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="flex items-center justify-center mt-20">

        <form
          onSubmit={handleSubmit}
          className="bg-[#081028] p-10 rounded-2xl w-[400px]"
        >

          <h1 className="text-5xl font-bold text-center mb-4">
            Create Account
          </h1>

          <p className="text-gray-400 text-center mb-8">
            Register to begin AI interview practice
          </p>

          <div className="mb-5">
            <label>Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-2 p-4 rounded-xl bg-black border border-gray-700"
            />
          </div>

          <div className="mb-5">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-2 p-4 rounded-xl bg-black border border-gray-700"
            />
          </div>

          <div className="mb-6">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-2 p-4 rounded-xl bg-black border border-gray-700"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 py-4 rounded-xl hover:bg-blue-700"
          >
            Register
          </button>

          <p className="text-center mt-6 text-gray-400">
            Already have an account?{" "}

            <Link
              to="/login"
              className="text-blue-500"
            >
              Login
            </Link>
          </p>

        </form>

      </div>
    </div>
  );
}

export default Register;