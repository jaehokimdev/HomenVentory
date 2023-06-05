import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";

const CreateCategory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userid, useremail, userroll } = location.state;
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://140.238.152.2:5555/api/category/create", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        categoryName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(`Created Category ${categoryName} successfully!!`);
        navigate(`/category/${userid}`, {
          state: {
            userid,
            useremail,
            userroll,
          },
        });
      });
  };

  return (
    <div className="auth-inner">
      <form onSubmit={handleSubmit}>
        <h3>Add Category</h3>

        <div className="mb-3">
          <label>Category Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Category"
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
