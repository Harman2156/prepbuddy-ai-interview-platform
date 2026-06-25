
import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";



function MyResumes() {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );



  const [resumes, setResumes] =
    useState([]);




  // ======================================
  // FETCH RESUMES
  // ======================================

  const fetchResumes =
    async () => {

      try {

        const response =
          await axios.get(

            `https://prepbuddy-ai-interview-platform.onrender.com/api/resume/${user._id}`
          );

        setResumes(
          response.data.resumes
        );

      } catch (error) {

        console.log(error);
      }
    };




  // ======================================
  // DELETE RESUME
  // ======================================

  const deleteResume =
    async (id) => {

      try {

        await axios.delete(

          `https://prepbuddy-ai-interview-platform.onrender.com/api/resume/${id}`
        );

        fetchResumes();

      } catch (error) {

        console.log(error);
      }
    };




  // ======================================
  // USE EFFECT
  // ======================================

  useEffect(() => {

    fetchResumes();

  }, []);




  return (

    <div className="min-h-screen bg-[#050816] text-white flex">

      <Sidebar />



      <div className="flex-1">

        <Navbar />



        <div className="p-10">

          <h1 className="text-5xl font-bold mb-10">

            My Resumes 📄

          </h1>





          {
            resumes.length > 0 ? (

              resumes.map((item) => (

                <div
                  key={item._id}
                  className="bg-[#0B1120] border border-white/10 rounded-3xl p-8 mb-6"
                >

                  <h2 className="text-3xl font-bold mb-4">

                    {item.filename}

                  </h2>




                  <p className="text-gray-400 mb-3">

                    Uploaded:
                    {" "}

                    {
                      new Date(
                        item.createdAt
                      ).toDateString()
                    }

                  </p>





                  <p className="text-green-400 text-2xl font-bold mb-6">

                    ATS Score:
                    {" "}
                    {item.atsScore}%

                  </p>






                  <div className="flex gap-4">

                    {/* VIEW */}



<button

  onClick={() => {

    window.open(

      `https://prepbuddy-ai-interview-platform.onrender.com/uploads/${item.resumeUrl.split("/").pop()}`,

      "_blank"
    );
  }}

  className="bg-blue-500 hover:bg-blue-600 px-5 py-3 rounded-xl text-white"
>

  View Resume

</button>







                    {/* DELETE */}

                    <button

                      onClick={() =>
                        deleteResume(item._id)
                      }

                      className="bg-red-500 px-6 py-3 rounded-xl"
                    >

                      Delete

                    </button>

                  </div>

                </div>
              ))

            ) : (

              <p className="text-gray-400 text-xl">

                No resumes uploaded yet.

              </p>
            )
          }

        </div>

      </div>

    </div>
  );
}

export default MyResumes;
