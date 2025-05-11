// src/context/UserContext.js
import { createContext, useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

// Context তৈরি
export const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
  const [userList, setUserList] = useState(null);
  const [loading, setLoading] = useState(true);

  const db = getDatabase();
  const auth = getAuth();

  useEffect(() => {
    const fetchData = () => {
      const userRef = ref(db, "users/");
      onValue(userRef, (snapshot) => {
        let data = {};
        snapshot.forEach((item) => {
          if (auth.currentUser?.uid === item.val().uid) {
            data = { ...item.val(), userkey: item.key };
          }
        });
        setUserList(data);
        setLoading(false);
      });
    };

    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ userList, loading }}>
      {children}
    </UserContext.Provider>
  );
};
