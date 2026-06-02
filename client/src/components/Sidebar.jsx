import {

  FiHome,
  FiFileText,
  FiMic,
  FiBarChart2,
  FiUser,
  FiLogOut,

} from "react-icons/fi";

import {
  useLocation,
} from "react-router-dom";

function Sidebar() {

  const location =
    useLocation();

  const menuItems = [

    {
      name: "Dashboard",
      icon: <FiHome size={22} />,
      path: "/dashboard",
      color:
        "hover:bg-blue-500/10 hover:text-blue-400",
    },

    {
      name: "My Resumes",
      icon:
        <FiFileText size={22} />,
      path:
        "/my-resumes",
      color:
        "hover:bg-purple-500/10 hover:text-purple-400",
    },

    {
      name:
        "Mock Interviews",
      icon:
        <FiMic size={22} />,
      path:
        "/interview",
      color:
        "hover:bg-pink-500/10 hover:text-pink-400",
    },

    {
      name:
        "AI Feedback",
      icon:
        <FiBarChart2 size={22} />,
      path:
        "/ai-feedback",
      color:
        "hover:bg-green-500/10 hover:text-green-400",
    },

    {
      name: "Profile",
      icon:
        <FiUser size={22} />,
      path: "/profile",
      color:
        "hover:bg-yellow-500/10 hover:text-yellow-400",
    },
  ];

  return (

   <div className="w-[270px] min-h-screen relative z-50bg-gradient-to-b from-[#081028] to-[#020617] border-r border-white/10 p-6 flex flex-col justify-between shadow-2xl">


      {/* TOP */}
      <div>

        {/* LOGO */}
        <div className="mb-16">

          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent tracking-wide">

  PrepBuddy

</h1>

          <p className="text-gray-500 mt-2 text-sm">

            AI Powered Interview Prep

          </p>

        </div>


        {/* MENU */}
        <div className="space-y-3">

          {
            menuItems.map(
              (item, index) => (

                <a
                  key={index}
                  href={item.path}
                  className={`

                    flex items-center gap-4
                    px-5 py-4 rounded-2xl
                    transition-all duration-300
                    text-lg font-medium

                    ${
                      location.pathname ===
                      item.path

                        ? "bg-white/10 text-white border border-white/10 shadow-lg"

                        : `text-gray-300 ${item.color}`
                    }

                  `}
                >

                  <div className="text-2xl">

                    {item.icon}

                  </div>

                  {item.name}

                </a>
              )
            )
          }

        </div>

      </div>


      {/* BOTTOM */}
      <div className="space-y-4">


        {/* USER CARD */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-xl">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-2xl font-bold">

              H

            </div>

            <div>

              <h2 className="font-semibold text-lg">

                Harman

              </h2>

              <p className="text-gray-400 text-sm">

                AI Interview Candidate

              </p>

            </div>

          </div>

        </div>



      </div>

    </div>
  );
}

export default Sidebar;