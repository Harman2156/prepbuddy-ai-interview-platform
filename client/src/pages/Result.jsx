import Navbar from "../components/Navbar";

function Result() {

  const interview =
    JSON.parse(

      localStorage.getItem(
        "latestInterview"
      )
    );

  return (

    <div className="min-h-screen bg-[#050816] text-white">

      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12">


        {/* HEADER */}
        <div className="text-center mb-16">

          <h1 className="text-6xl font-bold mb-6">

            AI Interview Result

          </h1>

          <p className="text-gray-400 text-xl">

            Detailed AI-powered interview analysis

          </p>

        </div>


        {/* SCORE SECTION */}
        <div className="bg-[#0B1120] rounded-3xl p-10 border border-gray-800 mb-10">

          <div className="flex flex-col md:flex-row items-center justify-between gap-10">


            {/* SCORE CIRCLE */}
            <div className="flex flex-col items-center">

              <div className="w-56 h-56 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center shadow-2xl">

                <div className="w-44 h-44 rounded-full bg-[#050816] flex flex-col items-center justify-center">

                  <h2 className="text-6xl font-bold text-white">

                    {interview?.score}

                  </h2>

                  <p className="text-gray-400 mt-2">
                    Score
                  </p>

                </div>

              </div>

            </div>


            {/* DETAILS */}
            <div className="flex-1">

              <h2 className="text-4xl font-bold mb-6">

                Interview Summary

              </h2>

              <div className="space-y-4 text-xl">

                <p>

                  <span className="text-gray-400">
                    Role:
                  </span>

                  {" "}

                  {interview?.role}

                </p>

                <p>

                  <span className="text-gray-400">
                    Interview Type:
                  </span>

                  {" "}

                  {interview?.type}

                </p>

                <p>

                  <span className="text-gray-400">
                    AI Feedback:
                  </span>

                  {" "}

                  {interview?.feedback}

                </p>

              </div>

            </div>

          </div>

        </div>


        {/* STRENGTHS + WEAKNESSES */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">


          {/* STRENGTHS */}
          <div className="bg-[#0B1120] p-8 rounded-3xl border border-gray-800">

            <h2 className="text-3xl font-bold text-green-400 mb-8">

              Strengths

            </h2>

            <div className="space-y-5">

              {
                interview?.strengths?.map(

                  (
                    item,
                    index
                  ) => (

                    <div
                      key={index}
                      className="bg-black p-5 rounded-2xl border border-green-500"
                    >

                      <p className="text-lg">
                        ✅ {item}
                      </p>

                    </div>
                  )
                )
              }

            </div>

          </div>


          {/* WEAKNESSES */}
          <div className="bg-[#0B1120] p-8 rounded-3xl border border-gray-800">

            <h2 className="text-3xl font-bold text-red-400 mb-8">

              Weaknesses

            </h2>

            <div className="space-y-5">

              {
                interview?.weaknesses?.map(

                  (
                    item,
                    index
                  ) => (

                    <div
                      key={index}
                      className="bg-black p-5 rounded-2xl border border-red-500"
                    >

                      <p className="text-lg">
                        ❌ {item}
                      </p>

                    </div>
                  )
                )
              }

            </div>

          </div>

        </div>


        {/* AI SUGGESTIONS */}
        <div className="bg-[#0B1120] p-10 rounded-3xl border border-gray-800 mb-10">

          <h2 className="text-4xl font-bold mb-8 text-blue-400">

            AI Suggestions

          </h2>

          <div className="space-y-5">

            <div className="bg-black p-6 rounded-2xl">

              <p className="text-lg">

                🚀 Practice more real-world interview questions.

              </p>

            </div>

            <div className="bg-black p-6 rounded-2xl">

              <p className="text-lg">

                📚 Improve technical depth in backend concepts.

              </p>

            </div>

            <div className="bg-black p-6 rounded-2xl">

              <p className="text-lg">

                🎯 Focus on communication confidence.

              </p>

            </div>

          </div>

        </div>


        {/* ACTION BUTTONS */}
        <div className="flex flex-col md:flex-row gap-6 justify-center">


          <button
            onClick={() =>
              window.location.href =
                "/interview"
            }
            className="bg-blue-600 px-10 py-4 rounded-2xl hover:bg-blue-700 text-xl font-semibold"
          >

            Start New Interview

          </button>


          <button
            onClick={() =>
              window.location.href =
                "/dashboard"
            }
            className="bg-purple-600 px-10 py-4 rounded-2xl hover:bg-purple-700 text-xl font-semibold"
          >

            Back to Dashboard

          </button>

        </div>

      </div>

    </div>
  );
}

export default Result;