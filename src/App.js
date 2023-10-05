import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/home";
import { Signup } from "./pages/signup/signup";
import { Login } from "./pages/login/login";
import { Header } from "./pages/home/header";
import {Task} from "./pages/home/task";

import { Createtask } from "./pages/home/createtask";
import { UserContextProvider } from "./content/usercontext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserContextProvider>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="header" element={<Header />} />
            </Route>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-task" element={<Createtask />} />
            <Route path="/task/:id" element={<Task />} />

          </Routes>
        </UserContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
