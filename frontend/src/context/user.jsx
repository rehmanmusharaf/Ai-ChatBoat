import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const serverUrl = import.meta.env.VITE_APP_SERVER;
// Create the context
const UserContext = createContext();

// Provider component
const UserState = ({ children }) => {
  const [state, setState] = useState({
    loading: null,
    success: false,
    user: null,
  });

  const getUser = async () => {
    try {
      setState((prev) => {
        return { ...prev, loading: true };
      });
      const response = await axios.get(`${serverUrl}/api/getuser`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setState((prev) => {
          return {
            ...prev,
            loading: false,
            user: response.data.user,
            success: true,
          };
        });
        console.log("User data:", response.data.user);
        return response.data.user;
      } else {
        setState((prev) => {
          return { ...prev, loading: false };
        });
        console.error("Error:", response.data.message);
        return null;
      }
    } catch (error) {
      setState((prev) => {
        return { ...prev, loading: false };
      });
      console.error("API call error:", error);
      return null;
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using the context
export const useAuth = () => useContext(UserContext);

export default UserState;
