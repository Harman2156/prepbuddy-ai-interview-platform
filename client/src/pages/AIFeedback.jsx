import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function AIFeedback() {

const latestInterview =
  JSON.parse(
    localStorage.getItem(
      "latestFeedback"
    )
  ) || {};

  return (

    <div className="min-h-screen bg-[#050816] text-white flex">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-10">

          <h1 className="text-5xl font-bold mb-10">

            AI Feedback 🤖

          </h1>


          {/* SCORE */}
          <div className="bg-[#0B1120] p-8 rounded-3xl border border-gray-800 mb-10">

            <h2 className="text-3xl font-bold text-yellow-400 mb-4">

              Overall Score

            </h2>

            <p className="text-7xl font-bold">

              {latestInterview.score || 0}/10

            </p>

          </div>


          {/* FEEDBACK */}
          <div className="bg-[#0B1120] p-8 rounded-3xl border border-gray-800 mb-10">

            <h2 className="text-3xl font-bold text-green-400 mb-6">

              AI Feedback

            </h2>

            <p className="text-gray-300 text-lg leading-8 whitespace-pre-wrap">

              {
                latestInterview.feedback ||

                "No feedback available yet."
              }

            </p>

          </div>


          {/* STRENGTHS */}
          <div className="bg-[#0B1120] p-8 rounded-3xl border border-gray-800 mb-10">

            <h2 className="text-3xl font-bold text-green-400 mb-6">

              Strengths

            </h2>

            <div className="space-y-4">

              {
                latestInterview.strengths &&
                latestInterview.strengths.length > 0

                  ? latestInterview.strengths.map(

                      (
                        item,
                        index
                      ) => (

                        <div
                          key={index}
                          className="bg-black p-5 rounded-2xl border border-green-500"
                        >

                          ✅ {item}

                        </div>
                      )
                    )

                  : (

                    <p className="text-gray-400">

                      No strengths available

                    </p>
                  )
              }

            </div>

          </div>


          {/* WEAKNESSES */}
          <div className="bg-[#0B1120] p-8 rounded-3xl border border-gray-800">

            <h2 className="text-3xl font-bold text-red-400 mb-6">

              Weaknesses

            </h2>

            <div className="space-y-4">

              {
                latestInterview.weaknesses &&
                latestInterview.weaknesses.length > 0

                  ? latestInterview.weaknesses.map(

                      (
                        item,
                        index
                      ) => (

                        <div
                          key={index}
                          className="bg-black p-5 rounded-2xl border border-red-500"
                        >

                          ❌ {item}

                        </div>
                      )
                    )

                  : (

                    <p className="text-gray-400">

                      No weaknesses available

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

export default AIFeedback;