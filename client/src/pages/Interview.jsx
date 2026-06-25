
import {
  useState,
  useEffect,
} from "react";

import axios from "axios";
import Webcam from "react-webcam";

import {
  Mic,
  Timer,
  Brain,
} from "lucide-react";

import Navbar from "../components/Navbar";

function Interview() {

  const [role, setRole] =
    useState("");

  const [experience, setExperience] =
    useState("Fresher");

  const [type, setType] =
    useState("Technical");

  const [resume, setResume] =
    useState(null);

  const [questions, setQuestions] =
    useState([]);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answer, setAnswer] =
    useState("");

  const [feedback, setFeedback] =
    useState("");

  const [score, setScore] =
    useState(0);

  const [loading, setLoading] =
    useState(false);

  const [timer, setTimer] =
    useState(0);

  const [listening, setListening] =
    useState(false);

  const [allAnswers, setAllAnswers] =
    useState([]);

  const [finalScore, setFinalScore] =
    useState(0);

  const [finalFeedback, setFinalFeedback] =
    useState("");

  const [strengths, setStrengths] =
    useState([]);

  const [weaknesses, setWeaknesses] =
    useState([]);


  // TIMER

  useEffect(() => {

    let interval;

    if (questions.length > 0) {

      interval =
        setInterval(() => {

          setTimer(
            (prev) => prev + 1
          );

        }, 1000);
    }

    return () =>
      clearInterval(interval);

  }, [questions]);


  // SPEAK QUESTION

  const speakQuestion = () => {

    if (questions.length > 0) {

      const speech =
        new SpeechSynthesisUtterance(
          questions[currentQuestion]
        );

      speech.lang = "en-US";

      window.speechSynthesis.speak(
        speech
      );
    }
  };

  useEffect(() => {

    if (questions.length > 0) {

      speakQuestion();
    }

  }, [currentQuestion, questions]);


  // START INTERVIEW

  const startInterview =
    async () => {

      try {

        if (!role) {

          alert(
            "Please enter role"
          );

          return;
        }

        setLoading(true);

        const response =
          await axios.post(

            "https://prepbuddy-ai-interview-platform.onrender.com/api/interview/generate",

            {
              role,
              experience,
              type,
            }
          );

        setQuestions(
          response.data.questions
        );

        setLoading(false);

      } catch (error) {

        console.log(error);

        setLoading(false);
      }
    };


  // RESUME INTERVIEW

  const startResumeInterview =
    async () => {

      try {

        if (!resume) {

          alert(
            "Upload Resume First"
          );

          return;
        }

        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          "resume",
          resume
        );

        const response =
          await axios.post(

            "https://prepbuddy-ai-interview-platform.onrender.com/api/interview/generate-resume",

            formData
          );

        setQuestions(
          response.data.questions
        );

        setLoading(false);

      } catch (error) {

        console.log(error);

        setLoading(false);
      }
    };


  // VOICE INPUT

  const startListening =
    () => {

      const SpeechRecognition =

        window.SpeechRecognition ||

        window.webkitSpeechRecognition;

      if (!SpeechRecognition) {

        alert(
          "Speech Recognition not supported"
        );

        return;
      }

      const recognition =
        new SpeechRecognition();

      recognition.lang =
        "en-US";

      setListening(true);

      recognition.start();

      recognition.onresult =
        (event) => {

          const transcript =
            event.results[0][0]
              .transcript;

          setAnswer(transcript);
        };

      recognition.onend =
        () => {

          setListening(false);
        };
    };


  // SUBMIT ANSWER

  const submitAnswer =
    async () => {

      try {

        if (!answer) {

          alert(
            "Please enter answer"
          );

          return;
        }

        setLoading(true);

        const response =
          await axios.post(

            "https://prepbuddy-ai-interview-platform.onrender.com/api/interview/evaluate",

            {
              question:
                questions[currentQuestion],

              answer,
            }
          );

        const currentFeedback =
          response.data.result.feedback;

        const currentScore =
          response.data.result.overall;

        setFeedback(
          currentFeedback
        );

        setScore(
          currentScore
        );

        setStrengths(
          response.data.result.strengths || []
        );

        setWeaknesses(
          response.data.result.weaknesses || []
        );

        setAllAnswers((prev) => [

          ...prev,

          {
            question:
              questions[currentQuestion],

            answer,
          },
        ]);

        setFinalScore(
          currentScore
        );

        setFinalFeedback(
          currentFeedback
        );

        setLoading(false);

      } catch (error) {

        console.log(error);

        setLoading(false);
      }
    };


  // SAVE INTERVIEW

  const saveInterview =
    async () => {

      try {

        const user =
          JSON.parse(
            localStorage.getItem(
              "user"
            )
          );

        const response =
          await axios.post(

            "https://prepbuddy-ai-interview-platform.onrender.com/api/interview/save",

            {
              user: user._id,

              role,

              type,

              score: finalScore,

              feedback: finalFeedback,

              questions: allAnswers,
            }
          );


        // UPDATE USER

        localStorage.setItem(

          "user",

          JSON.stringify(
            response.data.updatedUser
          )
        );


        // SAVE FEEDBACK

        localStorage.setItem(

          "latestFeedback",

          JSON.stringify({

            score: finalScore,

            feedback: finalFeedback,

            strengths,

            weaknesses,
          })
        );


        // REDIRECT

        window.location.href =
          "/ai-feedback";

      } catch (error) {

        console.log(error);
      }
    };


  // NEXT QUESTION

  const nextQuestion =
    () => {

      if (
        currentQuestion <
        questions.length - 1
      ) {

        setCurrentQuestion(
          currentQuestion + 1
        );

        setAnswer("");

        setFeedback("");

      } else {

        saveInterview();
      }
    };


  return (

    <div className="min-h-screen bg-[#020617] text-white overflow-hidden">

      <Navbar />


      {/* BG EFFECTS */}

      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 blur-[150px] rounded-full"></div>

      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 blur-[150px] rounded-full"></div>


      <div className="relative z-10 px-4 py-4">

        {
          questions.length === 0 ? (

            // SETUP SCREEN

            <div className="max-w-5xl mx-auto bg-white/5 border border-white/10 backdrop-blur-xl rounded-[30px] p-8 shadow-2xl">

              <div className="flex items-center gap-5 mb-7">

                <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">

                  <Brain size={40} />

                </div>

                <div>

                  <h1 className="text-5xl font-bold">

                    AI Interview Setup

                  </h1>

                  <p className="text-gray-400 mt-2">

                    Configure your smart mock interview

                  </p>

                </div>

              </div>


              <div className="mb-5">

                <label className="text-lg text-gray-300">

                  Job Role

                </label>

                <input
                  type="text"
                  placeholder="Frontend Developer"
                  value={role}
                  onChange={(e) =>
                    setRole(e.target.value)
                  }
                  className="w-full mt-3 bg-[#0F172A] border border-blue-500 rounded-2xl px-5 py-3.5 outline-none"
                />

              </div>


              <div className="mb-5">

                <label className="text-lg text-gray-300">

                  Experience Level

                </label>

                <select
                  value={experience}
                  onChange={(e) =>
                    setExperience(
                      e.target.value
                    )
                  }
                  className="w-full mt-3 bg-[#0F172A] border border-white/10 rounded-2xl px-5 py-3.5 outline-none"
                >

                  <option>
                    Fresher
                  </option>

                  <option>
                    1 Year
                  </option>

                  <option>
                    2 Years
                  </option>

                  <option>
                    3+ Years
                  </option>

                </select>

              </div>


              <div className="mb-5">

                <label className="text-lg text-gray-300">

                  Interview Type

                </label>

                <select
                  value={type}
                  onChange={(e) =>
                    setType(
                      e.target.value
                    )
                  }
                  className="w-full mt-3 bg-[#0F172A] border border-white/10 rounded-2xl px-5 py-3.5 outline-none"
                >

                  <option>
                    Technical
                  </option>

                  <option>
                    HR
                  </option>

                  <option>
                    Mixed
                  </option>

                </select>

              </div>


              <div className="mb-5">

                <label className="text-lg text-gray-300">

                  Upload Resume

                </label>

                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) =>
                    setResume(
                      e.target.files[0]
                    )
                  }
                  className="w-full mt-3 bg-[#0F172A] border border-white/10 rounded-2xl px-5 py-3.5"
                />

              </div>


              <div className="grid grid-cols-2 gap-4 mt-6">

                <button
                  onClick={startInterview}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 py-3.5 rounded-2xl font-semibold"
                >

                  {
                    loading
                      ? "Generating..."
                      : "Start AI Interview"
                  }

                </button>

                <button
                  onClick={
                    startResumeInterview
                  }
                  className="bg-gradient-to-r from-purple-500 to-pink-500 py-3.5 rounded-2xl font-semibold"
                >

                  Resume Interview

                </button>

              </div>

            </div>

          ) : (

            // INTERVIEW SCREEN

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full h-[calc(100vh-100px)]">

              {/* LEFT PANEL */}

              <div className="bg-gradient-to-b from-[#0F172A] to-[#111827] border border-white/10 rounded-[32px] p-7 flex flex-col justify-between shadow-2xl h-full">

                <div className="flex items-center justify-between">

                  <div className="bg-blue-500/20 px-5 py-3 rounded-2xl font-semibold">

                    Question {currentQuestion + 1}/{questions.length}

                  </div>

                  <div className="bg-red-500/20 px-5 py-3 rounded-2xl flex items-center gap-2">

                    <Timer size={18} />

                    {timer}s

                  </div>

                </div>


                <div className="flex flex-col items-center justify-center text-center flex-1">

                  <div className="w-28 h-28 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-5xl mb-6 shadow-2xl">

                    🤖

                  </div>

                  <h2 className="text-5xl font-bold mb-3">

                    AI Interviewer

                  </h2>

                  <p className="text-gray-400 text-lg">

                    Real-time smart interview session

                  </p>

                </div>


                <div>

                  <div className="bg-[#0B1220] border border-blue-500/20 rounded-[24px] p-7 text-2xl leading-relaxed shadow-inner">

                    {questions[currentQuestion]}

                  </div>


                  <div className="mt-5">

                    <button
                      onClick={() =>
                        (window.location.href =
                          "/dashboard")
                      }
                      className="bg-gradient-to-r from-red-500 to-pink-500 px-5 py-2 rounded-xl text-sm font-semibold shadow-lg"
                    >

                      End

                    </button>

                  </div>

                </div>

              </div>


              {/* RIGHT PANEL */}

              <div className="bg-gradient-to-b from-[#111827] to-[#0F172A] border border-white/10 rounded-[32px] p-5 flex flex-col shadow-2xl h-full overflow-y-auto">

                {/* CAMERA */}

                
<div className="relative bg-black rounded-[28px] border border-white/10 p-3 overflow-hidden shadow-2xl mb-5">

  <Webcam
    audio={false}
    mirrored={true}
    screenshotFormat="image/jpeg"
    videoConstraints={{
      width: 1280,
      height: 720,
      facingMode: "user",
    }}
    className="
      w-full
      h-[420px]
      object-cover
      rounded-[20px]
      bg-black
    "
  />

  <div className="absolute top-5 right-5 bg-red-500 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">

    LIVE

  </div>

</div>



                {/* ANSWER */}

                <textarea
                  value={answer}
                  onChange={(e) =>
                    setAnswer(
                      e.target.value
                    )
                  }
                  placeholder="Speak or type your answer..."
                  className="w-full h-[170px] bg-[#0B1220] border border-white/10 rounded-[24px] p-5 outline-none resize-none text-lg"
                ></textarea>


                {/* BUTTONS */}

                <div className="grid grid-cols-2 gap-4 mt-5">

                  <button
                    onClick={startListening}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 py-4 rounded-[20px] font-semibold flex items-center justify-center gap-2 shadow-lg"
                  >

                    <Mic size={20} />

                    {
                      listening
                        ? "Listening..."
                        : "Voice Answer"
                    }

                  </button>

                  <button
                    onClick={submitAnswer}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 py-4 rounded-[20px] font-semibold shadow-lg"
                  >

                    Submit

                  </button>

                </div>


                {/* FEEDBACK */}

                {
                  feedback && (

                    <div className="mt-5 bg-[#0B1220] border border-white/10 rounded-[24px] p-5">

                      <h3 className="text-2xl font-bold mb-3 text-green-400">

                        AI Feedback

                      </h3>

                      <p className="text-gray-300 leading-relaxed">

                        {feedback}

                      </p>

                      <div className="mt-4 text-yellow-400 text-xl font-bold">

                        Score: {score}/10

                      </div>

                      <button
                        onClick={nextQuestion}
                        className="mt-5 bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-[20px] font-semibold shadow-lg"
                      >

                        {
                          currentQuestion ===
                          questions.length - 1

                            ? "Finish Interview"

                            : "Next Question"
                        }

                      </button>

                    </div>
                  )
                }

              </div>

            </div>
          )
        }

      </div>

    </div>
  );
}

export default Interview;
