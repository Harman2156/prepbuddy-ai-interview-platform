
import {
  useEffect,
  useState,
} from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import axios from "axios";



function Dashboard() {

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );



  const [userData, setUserData] =
    useState(null);

  const [interviews, setInterviews] =
    useState([]);

  const [resume, setResume] =
    useState(null);

  const [analysis, setAnalysis] =
    useState("");

  const [loading, setLoading] =
    useState(false);




  // FETCH USER DATA

  useEffect(() => {

    fetchUser();

    fetchInterviews();

  }, []);




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




  // FETCH INTERVIEWS

  const fetchInterviews =
  async () => {

    try {

      const response =
        await axios.get(

          "http://localhost:5000/api/interview/history"
        );



      const filteredInterviews =

        response.data.interviews.filter(

          (item) =>

            item.user ===
            user._id ||

            item.user?._id ===
            user._id
        );



      setInterviews(
        filteredInterviews
      );

    } catch (error) {

      console.log(error);
    }
  };




  // ANALYZE RESUME

  const analyzeResumeHandler =
  async () => {

    try {

      if (!resume) {

        alert(
          "Please upload resume first"
        );

        return;
      }



      setLoading(true);




      // ANALYZE RESUME

      const formData =
        new FormData();

      formData.append(
        "resume",
        resume
      );



      const response =
        await axios.post(

          "http://localhost:5000/api/interview/analyze-resume",

          formData
        );



      setAnalysis(
        response.data.analysis
      );




      // SAVE RESUME TO CLOUDINARY + DB

      
const resumeFormData =
  new FormData();

resumeFormData.append(
  "resume",
  resume,
  resume.name
);

resumeFormData.append(
  "user",
  user._id
);

resumeFormData.append(
  "atsScore",
  Math.floor(
    Math.random() * 21
  ) + 80
);

await axios.post(

  "http://localhost:5000/api/resume/upload",

  resumeFormData,

  {
    headers: {
      "Content-Type":
        "multipart/form-data",
    },
  }
);




      // LOCAL STORAGE

      localStorage.setItem(

        "resumeName",

        resume.name
      );



      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);
    }
  };




  // TOTAL RESUMES

  const totalResumes =

    localStorage.getItem(
      "resumeName"
    )

      ? 1

      : 0;




  return (

    <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#081028] to-black text-white flex relative overflow-hidden">


      {/* GLOW EFFECTS */}

      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500/20 blur-[120px] rounded-full pointer-events-none"></div>




      {/* SIDEBAR */}

      <Sidebar />




      {/* MAIN */}

      <div className="flex-1 relative z-10">

        <Navbar />



        <div className="p-10">


          {/* HEADER */}

          <div className="mb-12">

            <h1 className="text-5xl font-bold mb-4">

              Welcome back,
              {" "}
              {userData?.name}

            </h1>

            <p className="text-gray-400 text-xl">

              {userData?.email}

            </p>

          </div>





          {/* TOP STATS */}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">


            {/* TOTAL INTERVIEWS */}

            <div className="bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/10">

              <h2 className="text-gray-400 text-lg mb-3">

                Total Interviews

              </h2>

              <p className="text-5xl font-bold text-blue-400">

                {
                  userData?.totalInterviews || 0
                }

              </p>

            </div>




            {/* PERFORMANCE */}

            <div className="bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/10">

              <h2 className="text-gray-400 text-lg mb-3">

                Performance Score

              </h2>

              <p className="text-5xl font-bold text-green-400">

                {
                  userData?.averageScore || 0
                }

              </p>

            </div>




            {/* RESUMES */}

            <div className="bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/10">

              <h2 className="text-gray-400 text-lg mb-3">

                Resumes Uploaded

              </h2>

              <p className="text-5xl font-bold text-purple-400">

                {totalResumes}

              </p>

            </div>




            {/* AI STATUS */}

            <div className="bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/10">

              <h2 className="text-gray-400 text-lg mb-3">

                AI Interviewer

              </h2>

              <p className="text-3xl font-bold text-yellow-400">

                Active

              </p>

            </div>

          </div>





{/* MAIN GRID */}

<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">


  {/* RESUME CARD */}

  <div className="bg-gradient-to-br from-[#111936] to-[#0B1023] border border-white/10 rounded-[32px] p-8 shadow-2xl relative overflow-hidden">

    <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 blur-[80px] rounded-full"></div>

    <h2 className="text-3xl font-bold mb-8">

      Resume Upload

    </h2>




    <div className="border border-dashed border-purple-400/30 rounded-[28px] p-12 text-center bg-[#0D1330]/60">

      <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-5xl mb-6 shadow-xl">

        ☁️

      </div>



      <h3 className="text-2xl font-semibold mb-3">

        Upload your PDF Resume

      </h3>



      <p className="text-gray-400 mb-8">

        Drag & drop your file here or

      </p>



      <input
        type="file"
        accept=".pdf"
        onChange={(e) =>
          setResume(
            e.target.files[0]
          )
        }
        className="hidden"
        id="resumeUpload"
      />



      <label
        htmlFor="resumeUpload"
        className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 rounded-2xl cursor-pointer font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
      >

        Choose File

      </label>



      <p className="text-gray-500 mt-6">

        PDF only, Max 10MB

      </p>



      {
        resume && (

          <p className="text-green-400 mt-5 font-medium">

            {resume.name}

          </p>
        )
      }

    </div>




    <button

      onClick={
        analyzeResumeHandler
      }

      className="w-full mt-8 bg-gradient-to-r from-green-500 to-emerald-600 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-xl"
    >

      {
        loading

          ? "Analyzing Resume..."

          : "AI Resume Review"
      }

    </button>





    {
      analysis && (

        <div className="bg-black/40 p-6 rounded-2xl mt-6 border border-white/10">

          <h2 className="text-2xl font-bold text-green-400 mb-4">

            AI Resume Analysis

          </h2>

          <p className="text-gray-300 whitespace-pre-wrap leading-8">

            {analysis}

          </p>

        </div>
      )
    }

  </div>






  {/* INTERVIEW CARD */}

  <div className="bg-gradient-to-br from-[#111936] to-[#0B1023] border border-white/10 rounded-[32px] p-8 shadow-2xl relative overflow-hidden">

    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-500/20 blur-[80px] rounded-full"></div>

    <div className="flex justify-between items-center mb-8">

      <h2 className="text-3xl font-bold">

        Mock Interviews

      </h2>



      <button
        className="text-purple-400 hover:text-purple-300 transition-all"
      >

        View History

      </button>

    </div>





    <div className="bg-[#0D1330]/60 border border-white/10 rounded-[28px] p-8 flex flex-col lg:flex-row items-center justify-between gap-8">

      
      {/* LEFT */}

      <div className="flex-1">

        <h3 className="text-4xl font-bold mb-4">

          AI Interviewer

        </h3>



        <p className="text-gray-400 mb-6 text-lg">

          Practice technical and HR interviews with AI

        </p>





        <div className="space-y-4 mb-8">

          <div className="flex items-center gap-3 text-green-400">

            ✅ Real-time AI interaction

          </div>

          <div className="flex items-center gap-3 text-green-400">

            ✅ Technical + HR questions

          </div>

          <div className="flex items-center gap-3 text-green-400">

            ✅ Instant AI feedback

          </div>

        </div>





        <button

          onClick={() =>
            window.location.href =
              "/interview"
          }

          className="bg-gradient-to-r from-blue-500 to-purple-600 px-10 py-4 rounded-2xl font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-xl"
        >

          Start Interview →

        </button>

      </div>






      {/* RIGHT ROBOT */}

      <div className="flex justify-center">

        <img
          src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
          alt="AI Bot"
          className="w-[220px] drop-shadow-2xl animate-pulse"
        />

      </div>

    </div>

  </div>

</div>







          {/* RECENT INTERVIEWS */}

          <div className="bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/10 mt-10">

            <h2 className="text-3xl font-bold mb-8">

              Recent Interviews

            </h2>



            <div className="space-y-5">

              {
                interviews.length > 0

                  ? interviews.map((item) => (

                      <div
                        key={item._id}
                        className="flex items-center justify-between bg-black/40 p-6 rounded-2xl border border-white/5"
                      >

                        <div>

                          <h3 className="text-2xl font-semibold">

                            {item.role}

                          </h3>

                          <p className="text-gray-400 mt-2">

                            {item.type}
                            {" "}
                            Interview

                          </p>

                        </div>

                        <div className="text-green-400 text-3xl font-bold">

                          {item.score}/10

                        </div>

                      </div>
                    ))

                  : (

                    <p className="text-gray-400 text-xl">

                      No interviews found.

                    </p>
                  )
              }

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
