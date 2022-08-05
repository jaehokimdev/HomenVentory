import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import UserPage from "./components/Userpage";
import UserList from "./components/UserList";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/userpage/:id" element={<UserPage />} />
            <Route path="/userlist/:id" element={<UserList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
