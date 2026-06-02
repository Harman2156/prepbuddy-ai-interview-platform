import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const logoutHandler = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="w-full bg-[#0b1220] text-white px-10 py-5 flex items-center justify-between">

      {/* Left Logo */}
      <h1 className="text-4xl font-bold text-blue-500">
        
      </h1>

      {/* Right Links */}
      <div className="flex items-center gap-8 text-lg">

        <Link
          to="/"
          className="hover:text-blue-400"
        >
          Home
        </Link>

        {!token ? (
          <>
            <Link
              to="/login"
              className="hover:text-blue-400"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="hover:text-blue-400"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/dashboard"
              className="bg-blue-600 px-5 py-2 rounded-xl hover:bg-blue-700"
            >
              Dashboard
            </Link>

            <button
              onClick={logoutHandler}
              className="bg-red-600 px-5 py-2 rounded-xl hover:bg-red-700"
            >
              Logout
            </button>
          </>
        )}

      </div>
    </nav>
  );
}

export default Navbar;