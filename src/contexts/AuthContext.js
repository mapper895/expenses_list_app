import React, { useState, useContext, useEffect } from "react";
import { auth } from "../firebase/firebaseConfig";

// Create the context
const AuthContext = React.createContext();

// Hook for get into context
const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  // Create a state to know when the loading check
  // of onAuthStateChanged is finished
  const [loading, setLoading] = useState(true);

  // Effect to run the check once
  useEffect(() => {
    // Check if there´s a user
    const cancelSubscription = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return cancelSubscription;
  }, []);

  return (
    <AuthContext.Provider value={{ user: user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext, useAuth };
