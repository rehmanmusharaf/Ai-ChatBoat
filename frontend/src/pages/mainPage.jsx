import React from "react";
import SideBar from "../components/SideBar";
import ChatPage from "./ChatPage";
import HomePage from "./HomePage";
import { useAuth } from "../context/user";
function MainPage() {
  const state = useAuth();
  console.log("state of user is", state);
  return (
    <div className="bg-gradient-to-r from-[#BAD5FF]/50 to-[#92e0f7]/50 h-screen">
      <div className="grid grid-cols-[1fr,3fr] w-full h-full">
        {" "}
        <SideBar />
        <div className="flex ">
          <p></p>
          <ChatPage />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
