
import Navbar from "../components/Navbar";

function Home() {
  return (

    <div className="relative min-h-screen bg-black text-white overflow-hidden">


      {/* BLUE SHADING */}

      <div className="absolute bottom-[-120px] left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-500/30 blur-[180px] rounded-full"></div>




      {/* Navbar */}

      <div className="relative z-10">

        <Navbar />



        {/* Hero Section */}

        <div className="flex flex-col items-center justify-center text-center h-[85vh] px-6">

          <h1 className="text-7xl font-bold leading-tight mb-6">

            Master Your

            <span className="text-blue-500">
              {" "}Interviews
            </span>

            <br />

            With AI

          </h1>





          <p className="text-gray-400 text-xl max-w-3xl mb-10">

            Practice HR and technical interviews with AI-powered feedback,
            resume analysis, voice interaction, and real-time performance tracking.

          </p>






          {/* Buttons */}

          <div className="flex gap-6">

            <button

              onClick={() => {

                const user =
                  localStorage.getItem(
                    "user"
                  );

                if (user) {

                  window.location.href =
                    "/dashboard";

                } else {

                  window.location.href =
                    "/login";
                }
              }}

              className="bg-blue-600 px-10 py-4 rounded-2xl hover:bg-blue-700 text-xl font-semibold shadow-[0_0_40px_rgba(59,130,246,0.7)] transition-all duration-300"
            >

              Start Interview

            </button>






            <button

              onClick={() => {

                alert(

`🚀 AI Interview Platform Features

✅ AI Mock Interviews
✅ Resume Based Questions
✅ Voice Interviews
✅ AI Feedback
✅ Performance Tracking
✅ Resume Analysis
✅ Technical + HR Rounds`

                );
              }}

              className="border border-gray-700 px-10 py-4 rounded-2xl hover:bg-gray-900 text-xl font-semibold"
            >

              Learn More

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Home;
