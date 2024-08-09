import React from "react";
import aiLogo from "../assets/aiLogo.png";
import { Link } from "react-router-dom";
import { CiCirclePlus, CiSettings } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { useContext } from "react";
import { Context } from "../context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const serverUrl = import.meta.env.VITE_APP_SERVER;

function SideBar() {
  const navigate = useNavigate();
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

  const logout = async () => {
    try {
      const response = await axios.get(`${serverUrl}/user/logout`, {
        withCredentials: true,
      });
      if (response.data.success) {
        console.log("response of logout", response.data);
        navigate("/");
        // Optionally, redirect to a login page or home page
      } else {
        console.error("Logout failed:", response.data);
      }
    } catch (error) {
      console.error("Logout request error:", error);
    }
  };

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const amPM = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
    return `${hours}:${minutes} ${amPM}`;
  };

  return (
    <div className="md:w-[336px] w-[200px] shadow-2xl overflow-y-auto shadow-[#BAD5FF] border-r-1 border-white-300/25 flex flex-col justify-between">
      {/* Sidebar Content */}
      <div className="p-4 overflow-y-auto">
        {/* Upper Part */}
        <div className="flex items-center justify-between mb-4">
          <img className="h-12 rounded-full" src={aiLogo} alt="" />
          <button
            onClick={() => newChat()}
            className="flex items-center bg-blue-200 pl-2 pr-3 py-1 ml-2 md:pl-3 md:pr-4 md:py-2 rounded-full hover:shadow-lg hover:shadow-cyan-900"
          >
            <CiCirclePlus className="w-6 h-6" />
            <span className="md:ml-2 ml-1 ">New Chat</span>
          </button>
        </div>
        {/* Recents */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Recent Chats</h3>
          {prevPrompts.map((item, index) => {
            return (
              <div className="space-y-4 mt-5" key={index}>
                {/* Sample recent chat items */}
                <div
                  onClick={() => loadPrompt(item)}
                  className="flex items-center bg-gray-100 rounded-full py-3 pl-4 pr-8 cursor-pointer hover:bg-blue-200 hover:bg-opacity-50"
                >
                  <div className="flex-grow">{item.slice(0, 24)} ...</div>
                  <div className="text-xs text-gray-500">
                    {formatTime(Date.now())}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Lower Part */}
      <div className="p-4">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center">
            <CiSettings className="w-6 h-6" />
            <span className="ml-2 text-gray-700">Settings</span>
          </div>
          <div className="flex items-center">
            <IoIosLogOut className="w-6 h-6" />
            <button onClick={logout}>
              <span className="ml-2 text-gray-700">Log out</span>
            </button>
          </div>
          <div className="flex items-center">
            <button className="rounded-full py-[9px] px-[15px] bg-cyan-700 text-white">
              AI
            </button>
            <span className="ml-2 text-gray-700">Ai ChatBoat</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
