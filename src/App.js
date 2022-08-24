import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import UserPage from "./components/Userpage";
import UserList from "./components/UserList";
import EditUser from "./components/EditUser";
import InventoryList from "./components/InventoryList";
import CreateItem from "./components/CreateItem";
import EditInventory from "./components/EditInventory";
import CategoryList from "./components/CategoryList";
import CreateCategory from "./components/CreateCategory";
import EditCategory from "./components/EditCategory";
import CreateUser from "./components/CreateUser";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/createuser" element={<CreateUser />} />
            <Route path="/userpage/:id" element={<UserPage />} />
            <Route path="/userlist/:id" element={<UserList />} />
            <Route path="/edituser/:id" element={<EditUser />} />
            <Route path="/inventory/:id" element={<InventoryList />} />
            <Route path="/createitem" element={<CreateItem />} />
            <Route path="/edititem/:id" element={<EditInventory />} />
            <Route path="/category/:id" element={<CategoryList />} />
            <Route path="/createcategory" element={<CreateCategory />} />
            <Route path="/editcategory/:id" element={<EditCategory />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
