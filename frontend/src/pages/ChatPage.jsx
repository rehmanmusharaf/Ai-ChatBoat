import React from "react";
import aiLogo from "../assets/aiLogo.png";
import { IoSend } from "react-icons/io5";
import { useContext } from "react";
import { Context } from "../context/Context";

function ChatPage() {
  const {
    onSent,
    showResult,
    recentPrompt,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  return (
    <div className="flex flex-col w-full h-screen">
      {!showResult ? (
        <>
          <div className="flex-grow overflow-y-auto p-4">
            {/* Previous messages */}
            <div className="flex items-start mb-4">
              <button className="rounded-full py-[9px] px-[15px] md:mr-4 bg-cyan-700 text-white">
                AI ChatBoat
              </button>
              <div className="flex flex-col bg-gray-200 rounded-lg p-3 shadow-sm">
                <span className="text-gray-700">Heyy! How can I use this?</span>
                <span className="text-gray-500 text-sm mt-1">10:20 AM</span>
              </div>
            </div>

            {/* Introduction */}
            <div className="flex items-start justify-end mb-4">
              <div
                className="rounded-lg p-3 text-white shadow-sm"
                style={{ backgroundColor: "#2980b9" }}
              >
                Hello! I'm your AI assistant here to help. Just type your
                question in the input panel below, and I'll find the best
                information for you. Easy, right? Let's get started!
              </div>
              <img className="h-12 rounded-full md:ml-4" src={aiLogo} alt="" />
            </div>
          </div>
        </>
      ) : (
        <div className="flex-grow overflow-y-auto p-4">
          {/* Previous messages */}
          <div className="flex items-start mb-4">
            <button className="rounded-full py-[9px] px-[15px] md:mr-4 bg-cyan-700 text-white">
              Ai CHatBoat
            </button>
            <div className="flex flex-col bg-gray-200 rounded-lg p-3 shadow-sm">
              <span className="text-gray-700">{recentPrompt}</span>
              <span className="text-gray-500 text-sm mt-1">10:20 AM</span>
            </div>
          </div>

          {/* Result */}
          <div className="flex items-start justify-end mb-4">
            <div
              className="rounded-lg p-3 text-white shadow-sm"
              style={{ backgroundColor: "#2980b9" }}
            >
              {/* Loading animation */}
              {loading ? (
                <img
                  src="https://cdn.dribbble.com/users/1186261/screenshots/3718681/media/1df2396f1eaa146bcb7dd3e73c1dc77b.gif"
                  alt="Loading..."
                  className="w-6 h-6 bg-transparent animate-spin mx-auto rounded-full"
                />
              ) : (
                <span dangerouslySetInnerHTML={{ __html: resultData }}></span>
              )}
            </div>
            <img className="h-12 rounded-full md:ml-4" src={aiLogo} alt="" />
          </div>
        </div>
      )}

      {/* Input section */}
      <div className="flex items-center px-4 py-6 border-t border-gray-300">
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          className="w-full rounded-full pl-10 md:pl-4 md:px-2 md:py-4 focus:outline-none focus:border-cyan-700"
          placeholder="Type your message..."
          style={{ paddingLeft: "28px" }}
        />
        <button
          onClick={() => onSent()}
          className="ml-2 rounded-full py-2 px-2 bg-cyan-700 text-white"
        >
          <IoSend className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default ChatPage;
