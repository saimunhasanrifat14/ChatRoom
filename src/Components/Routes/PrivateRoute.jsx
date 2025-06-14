import React, { use, useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

const PrivateRoute = () => {
  // Gets the logged-in user's data and loading state from UserContext.
  const { userList, loading } = useContext(UserContext);
  console.log("User List:", userList);
  const [user, setUser] = useState(false);

  useEffect(() => {
    setUser(userList ? false : true);
  }, [userList]);

  return user ? <Navigate to="/login" /> : <Outlet />;
};

export default PrivateRoute;
