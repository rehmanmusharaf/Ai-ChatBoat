// node --version # Should be >= 18
// npm install @google/generative-ai

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const MODEL_NAME = "gemini-1.0-pro";
// const API_KEY = "AIzaSyB8fYzQ5-8F77eNiOtZwKAIwUnu2GksD8Y";
const API_KEY = process.env.API_KEY;
// "AIzaSyA97PKUBI1G-ejfjIW5jnCxyZWR9CNLdqQ";

async function runChat(res, prompt) {
  try {
    console.log("run chat function run and prompt here", prompt);
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: "user",
          parts: [{ text: "hii" }],
        },
        {
          role: "model",
          parts: [{ text: "Hello, how may I assist you?" }],
        },
      ],
    });

    const result = await chat.sendMessage(prompt);
    const response = result.response;
    console.log(response.text());
    return res.status(200).json({ success: true, result: response.text() });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Problem Occur",
      error: error.message,
    });
  }
}

module.exports = runChat;
