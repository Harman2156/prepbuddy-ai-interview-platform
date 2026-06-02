import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Profile() {

  const [userData, setUserData] =
    useState(null);

  const [isEditing, setIsEditing] =
    useState(false);

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );



  // =====================================
  // FETCH USER
  // =====================================

  const fetchUser =
    async () => {

      try {

        const response =
          await axios.get(

            `http://localhost:5000/api/auth/user/${user._id}`
          );

        setUserData(
          response.data.user
        );

      } catch (error) {

        console.log(error);
      }
    };



  // =====================================
  // UPDATE PROFILE
  // =====================================

  const updateProfile =
    async () => {

      try {

        const response =
          await axios.put(

            `http://localhost:5000/api/auth/update/${user._id}`,

            {
              name: userData.name,
              email: userData.email,
            }
          );


        // UPDATE LOCAL STORAGE

        localStorage.setItem(

          "user",

          JSON.stringify(
            response.data.user
          )
        );


        // UPDATE UI

        setUserData(
          response.data.user
        );


        // DISABLE EDIT MODE

        setIsEditing(false);


        alert(
          "Profile Updated Successfully"
        );

      } catch (error) {

        console.log(error);
      }
    };



  // =====================================
  // USE EFFECT
  // =====================================

  useEffect(() => {

    fetchUser();

  }, []);




  return (

    <div className="min-h-screen bg-[#050816] text-white flex">

      <Sidebar />

      <div className="flex-1">

        <Navbar />



        <div className="p-10">

          {/* PROFILE CARD */}

          <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-white/10 rounded-[35px] p-10 flex items-center gap-8 mb-10">

            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-5xl font-bold">

              {
                userData?.name
                  ?.charAt(0)
                  ?.toUpperCase()
              }

            </div>


            <div>

              <h1 className="text-5xl font-bold mb-3">

                {userData?.name}

              </h1>

              <p className="text-gray-300 text-xl mb-2">

                {userData?.email}

              </p>

              <p className="text-gray-400">

                Joined:
                {" "}

                {
                  userData?.createdAt
                    ? new Date(
                        userData.createdAt
                      ).toDateString()
                    : "N/A"
                }

              </p>

            </div>

          </div>



          {/* STATS */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

            {/* TOTAL */}

            <div className="bg-[#0B1120] border border-white/10 rounded-3xl p-8">

              <h2 className="text-gray-400 text-lg mb-3">

                Total Interviews

              </h2>

              <p className="text-5xl font-bold text-blue-400">

                {
                  userData?.totalInterviews || 0
                }

              </p>

            </div>



            {/* AVERAGE */}

            <div className="bg-[#0B1120] border border-white/10 rounded-3xl p-8">

              <h2 className="text-gray-400 text-lg mb-3">

                Average Score

              </h2>

              <p className="text-5xl font-bold text-green-400">

                {
                  userData?.averageScore || 0
                }

              </p>

            </div>



            {/* BEST */}

            <div className="bg-[#0B1120] border border-white/10 rounded-3xl p-8">

              <h2 className="text-gray-400 text-lg mb-3">

                Best Score

              </h2>

              <p className="text-5xl font-bold text-pink-400">

                {
                  userData?.bestScore || 0
                }

              </p>

            </div>

          </div>




          {/* RECENT ACTIVITY */}

          <div className="bg-[#0B1120] border border-white/10 rounded-3xl p-8 mb-10">

            <h2 className="text-4xl font-bold mb-8">

              Recent Activity

            </h2>


            <div className="space-y-5">

              <div className="bg-black/30 border border-green-500/20 p-5 rounded-2xl">

                ✅ Completed Mock Interviews

              </div>

              <div className="bg-black/30 border border-blue-500/20 p-5 rounded-2xl">

                📄 Resume Uploaded Successfully

              </div>

              <div className="bg-black/30 border border-purple-500/20 p-5 rounded-2xl">

                🚀 AI Performance Improved

              </div>

            </div>

          </div>




          {/* ACCOUNT SETTINGS */}

          <div className="bg-[#0B1120] border border-white/10 rounded-3xl p-8">

            <h2 className="text-4xl font-bold mb-8">

              Account Settings

            </h2>


            <div className="space-y-6">


              {/* NAME */}

              <input
                type="text"
                value={userData?.name || ""}

                onChange={(e) =>

                  setUserData({

                    ...userData,

                    name: e.target.value,
                  })
                }

                readOnly={!isEditing}

                className="w-full bg-black/30 border border-white/10 rounded-2xl p-4 outline-none"
              />



              {/* EMAIL */}

              <input
                type="email"
                value={userData?.email || ""}

                onChange={(e) =>

                  setUserData({

                    ...userData,

                    email: e.target.value,
                  })
                }

                readOnly={!isEditing}

                className="w-full bg-black/30 border border-white/10 rounded-2xl p-4 outline-none"
              />



              {/* BUTTONS */}

              {
                isEditing ? (

                  <button

                    onClick={updateProfile}

                    className="bg-gradient-to-r from-green-500 to-emerald-500 px-10 py-4 rounded-2xl font-semibold"
                  >

                    Save Changes

                  </button>

                ) : (

                  <button

                    onClick={() =>
                      setIsEditing(true)
                    }

                    className="bg-gradient-to-r from-blue-500 to-purple-500 px-10 py-4 rounded-2xl font-semibold"
                  >

                    Edit Profile

                  </button>
                )
              }

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;