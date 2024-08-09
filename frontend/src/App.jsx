import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MainPage from "./pages/mainPage";
import Loading from "./pages/Loading";
import ProtectdRoute from "./routes/ProtectedRoute";
function App() {
  return (
    <Router>
           {" "}
      <Routes>
        {/* Using element prop (recommended for v6+) */}
        <Route exact path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/mainpage"
          element={
            <ProtectdRoute>
              <MainPage />
            </ProtectdRoute>
          }
        />
                {/* <Route path="/loading" element={<Loading />} /> */}
      </Routes>
         {" "}
    </Router>
  );
}

export default App;
