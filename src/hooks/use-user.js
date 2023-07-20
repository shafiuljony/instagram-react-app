import { useState, useEffect } from "react";
import { getUserByUserId } from "../services/Firebase";

export default function useUser(userId) {
  const [activeUser, setActiveUser] = useState({});

  useEffect(() => {
    async function getUserObjByUserId() {
      if (userId) {
        // Make sure to pass the userId parameter to getUserByUserId function
        const [user] = await getUserByUserId(userId);
        setActiveUser(user || {});
      }
    }
    getUserObjByUserId(); // Call the function here with the userId parameter
  }, [userId]);

  // console.log('activeUser', activeUser);

  return { user: activeUser };
}
