import axios from "axios";
import React from "react";
import { createContext, useState } from "react";
const serverUrl = import.meta.env.VITE_APP_SERVER;

// import runChat from "../../../backend/config/gemini";
const runChat = "../../../backend/config/gemini";
export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    if (prompt !== undefined) {
      console.log("api End point function run !");
      const data = await axios.post(
        `${serverUrl}/api/gemini`,
        { prompt: prompt },
        { withCredentials: true }
      );
      console.log("data is:", data);
      const result = data.result;
      if (!data?.success) {
        response = "Unable to Find The Response";
        console.log("response is:", data);
      }
      response = result;
      // response = await runChat(prompt);
      setRecentPrompt(prompt);
    } else {
      console.log("else condition run ");
      setPrevPrompts((prev) => [...prev, input]);
      setRecentPrompt(input);
      try {
        const { data } = await axios.post(
          `${serverUrl}/api/gemini`,
          { prompt: input },
          { withCredentials: true }
        );
        console.log("data of response is:", data);
        response = data.result;
      } catch (error) {
        console.log("error is:", error);
        response = error.response.data.result;
      }
    }

    // Process response...
    console.log("reponse from chateBoat is ", response);
    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("</br>");
    setResultData(newResponse2);
    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
