import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const navigate = useNavigate();

  let userData = localStorage.getItem("user");

  userData = JSON.parse(userData);

  const [user, setUser] = useState(userData);
  const [loginStatus, setLoginstatus] = useState(userData ? true : false);

  const login = (userData) => {
    // Login logic here
    setLoginstatus(true);
    setUser(userData);

    localStorage.setItem("user", JSON.stringify(userData));

    navigate("/");
  };

  const logout = () => {
    // Logout logic here
    setLoginstatus(false);

    setUser(null);
    localStorage.removeItem("user");

    navigate("/login");
  };

  //loginStatus:true;
  //user:
  //login:function
  //logout:function
  return (
    <UserContext.Provider value={{ loginStatus, user, login, logout }}>
      {props.children}
    </UserContext.Provider>
  );
};
