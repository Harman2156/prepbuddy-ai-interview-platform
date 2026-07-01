const fs = require("fs");
const path = require("path");
const Resume =
require("../models/Resume");

const Interview =
require("../models/Interview");

const User =
require("../models/User");

const axios =
require("axios");



const pdfParse =
require("pdf-parse");


// ======================================
// GENERATE ROLE-BASED QUESTIONS
// ======================================

const generateQuestions =
async (req, res) => {

  try {

    const {
      role,
      experience,
      type,
    } = req.body;

    const prompt = `

Generate 10 ${type} interview questions  
for a ${experience} level ${role}.

Return ONLY a numbered list of questions.

Do not add explanations.
Do not add introductions.
`;

    const response =
      await axios.post(

        "https://openrouter.ai/api/v1/chat/completions",

        {

          model:
            "deepseek/deepseek-chat",

          messages: [

            {
              role: "user",
              content: prompt,
            },
          ],
        },

        {

          headers: {

            Authorization:
              `Bearer ${process.env.OPENROUTER_API_KEY}`,

            "Content-Type":
              "application/json",
          },
        }
      );

    const text =
      response.data.choices[0]
      .message.content;

    const questions =
      text
        .split("\n")
        .filter(

          (q) =>

            q.trim() !== "" &&

            !q.includes(
              "Here are"
            )
        );

    res.status(200).json({

      success: true,

      questions,
    });

  } catch (error) {

    console.log(

      error.response?.data ||

      error.message
    );

    res.status(500).json({

      message:
        "AI generation failed",
    });
  }
};


// ======================================
// GENERATE RESUME QUESTIONS
// ======================================

const generateResumeQuestions =
async (req, res) => {

  try {

    const dataBuffer = req.file.buffer;

    const pdfData =
      await pdfParse(
        dataBuffer
      );

    const resumeText =
      pdfData.text;

    const prompt = `

Generate 10 terview questions
based on this resume:

${resumeText}

Return ONLY a numbered list of questions.

Do not add explanations.
Do not add introductions.
`;

    const response =
      await axios.post(

        "https://openrouter.ai/api/v1/chat/completions",

        {

          model:
            "deepseek/deepseek-chat",

          messages: [

            {
              role: "user",
              content: prompt,
            },
          ],
        },

        {

          headers: {

            Authorization:
              `Bearer ${process.env.OPENROUTER_API_KEY}`,

            "Content-Type":
              "application/json",
          },
        }
      );

    const text =
      response.data.choices[0]
      .message.content;

    const questions =
      text
        .split("\n")
        .filter(

          (q) =>

            q.trim() !== "" &&

            !q.includes(
              "Here are"
            )
        );

    res.status(200).json({

      success: true,

      questions,
    });

  } catch (error) {

    console.log(

      error.response?.data ||

      error.message ||

      error
    );

    res.status(500).json({

      message:

        error.response?.data ||

        error.message ||

        "Resume interview generation failed",
    });
  }
};


// ======================================
// AI RESUME ANALYSIS
// ======================================
const analyzeResume = async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({
        message: "No resume uploaded",
      });
    }

    const dataBuffer = req.file.buffer;

    const pdfData = await pdfParse(dataBuffer);

    const resumeText = pdfData.text;

    const prompt = `
Analyze this resume.

Resume:
${resumeText}

Give response in this format:

ATS Score: /100

Strengths:
- point

Missing Skills:
- point

Suggestions:
- point
`;

    const response = await axios.post(

      "https://openrouter.ai/api/v1/chat/completions",

      {
        model: "deepseek/deepseek-chat",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },

      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }

    );

    const analysis =
      response.data.choices[0].message.content;

    res.status(200).json({
      success: true,
      analysis,
    });

  } catch (error) {

    console.log(
      error.response?.data ||
      error.message ||
      error
    );

    res.status(500).json({
      message: "Resume analysis failed",
    });

  }

};


// ======================================
// EVALUATE ANSWER
// ======================================

const evaluateAnswer =
async (req, res) => {

  try {

    const {
      question,
      answer,
    } = req.body;

    const prompt = `

You are a strict professional AI interviewer.

Evaluate the candidate answer realistically.

Question:
${question}

Candidate Answer:
${answer}

IMPORTANT RULES:

- Be strict like a real interviewer.
- Do NOT give high scores easily.
- Short answers should receive low scores.
- Incomplete answers should receive low scores.
- Detailed and technically correct answers should get high scores.
- If answer length is below 15 words, maximum overall score should be 4.
- If the answer is irrelevant, score should be below 3.
- Focus on:
  1. Technical Knowledge
  2. Communication Skills
  3. Confidence Level
  4. Clarity
  5. Completeness

Return ONLY valid JSON format:

{
  "technical": 4,
  "communication": 5,
  "confidence": 3,
  "overall": 4,
  "strengths": [
    "Some understanding of the topic"
  ],
  "weaknesses": [
    "Answer is too short",
    "Lacks technical depth",
    "Needs better explanation"
  ],
  "feedback": "The candidate shows limited understanding of the topic. The response is too brief and lacks technical depth. More detailed explanation and confidence are needed.",
  "improvement": "Practice giving structured and detailed technical answers with examples."
}
`;

    const response =
      await axios.post(

        "https://openrouter.ai/api/v1/chat/completions",

        {

          model:
            "deepseek/deepseek-chat",

          messages: [

            {
              role: "user",
              content: prompt,
            },
          ],
        },

        {

          headers: {

            Authorization:
              `Bearer ${process.env.OPENROUTER_API_KEY}`,

            "Content-Type":
              "application/json",
          },
        }
      );

    const text =
      response.data
      .choices[0]
      .message.content;

    const cleanedText =
      text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    const result =
      JSON.parse(
        cleanedText
      );

    res.status(200).json({

      success: true,

      result,
    });

  } catch (error) {

    console.log(

      error.response?.data ||

      error.message
    );

    res.status(500).json({

      message:
        "Evaluation failed",
    });
  }
};


// ======================================
// SAVE INTERVIEW
// ======================================

const saveInterview =
async (req, res) => {

  try {

    const {
      user,
      role,
      type,
      score,
      feedback,
      questions,
    } = req.body;


    // SAVE INTERVIEW

    const interview =

      await Interview.create({

        user,
        role,
        type,
        score,
        feedback,
        questions,
      });


    // FIND USER

    const existingUser =

      await User.findById(user);

    if (!existingUser) {

      return res.status(404).json({

        message:
          "User not found",
      });
    }


    // UPDATE TOTAL INTERVIEWS

    existingUser.totalInterviews += 1;


    // UPDATE BEST SCORE

    if (

      score >
      existingUser.bestScore

    ) {

      existingUser.bestScore =
        score;
    }


    // UPDATE AVERAGE SCORE

    existingUser.averageScore = (

      (

        existingUser.averageScore *

        (

          existingUser.totalInterviews - 1
        )

      ) + score

    ) / existingUser.totalInterviews;


    // ROUND SCORE

    existingUser.averageScore =
    Number(

      existingUser.averageScore
      .toFixed(1)
    );


    // SAVE USER

    await existingUser.save();


    // RESPONSE

    res.status(201).json({

      success: true,

      interview,

      updatedUser:
        existingUser,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        error.message,
    });
  }
};


// ======================================
// GET INTERVIEW HISTORY
// ======================================

const getInterviews =
async (req, res) => {

  try {

    const interviews =
      await Interview.find()
      .sort({

        createdAt: -1,
      });

    res.status(200).json({

      success: true,

      interviews,
    });

  } catch (error) {

    res.status(500).json({

      message:
        error.message,
    });
  }
};


// ======================================
// GET LATEST INTERVIEW
// ======================================

const getLatestInterview =
async (req, res) => {

  try {

    const interview =

      await Interview.findOne({

        user:
          req.params.userId,

      }).sort({

        createdAt: -1,
      });


    if (!interview) {

      return res.status(404).json({

        message:
          "No interview found",
      });
    }


    res.status(200).json({

      success: true,

      interview,
    });

  } catch (error) {

    res.status(500).json({

      message:
        error.message,
    });
  }
};



module.exports = {

  generateQuestions,

  generateResumeQuestions,

  analyzeResume,

  evaluateAnswer,

  saveInterview,

  getInterviews,

  getLatestInterview,
};
