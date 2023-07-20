import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function useAuthListener() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("authUser")));

  useEffect(() => {
    const auth = getAuth();
    const listener = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // We have a user...therefore we can store the user in localStorage
        localStorage.setItem('authUser', JSON.stringify(authUser)); // Update the key to 'authUser'
        setUser(authUser);
      } else {
        // We don't have an authUser,
        localStorage.removeItem("authUser");
        setUser(null);
      }
    });

    return () => listener();
  }, []);

  return { user };
}