import React, { useContext } from "react";
import { UserContext } from "../../content/usercontext";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  const { logout, login, user } = useContext(UserContext);

  return (
    <div className="shadow-md p-6 flex justify-between items-center sticky top-0 bg-white z-10">
      <p className="text-xl flex gap-2 justify-center items-center text-blue-500 font-medium" ><span className="text-2xl ">Welcome,</span><span className="font-bold"> {user?.name}</span> <span> 👋</span>  </p>

      {user ? (
        <button 
          onClick={() => {
            logout();
          }}
          className="border bg-red-500 text-white rounded-xl px-3 py-1"
        >
          logout
        </button>
      ) : (
        <button onClick={() => navigate("/login")}>login</button>
      )}
    </div>
  );
};
