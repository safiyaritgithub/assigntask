import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import {Home} from './pages/home/home';
import {Signup} from './pages/signup/signup';
import {Login} from './pages/login/login';





function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route  path="/" element={<Home/>} />
          <Route  path="/signup" element={<Signup/>} />
          <Route  path="/login" element={<Login/>} />

        </Routes>
      </BrowserRouter>

   </div>
  );
}

export default App;
