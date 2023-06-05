import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";

const EditCategory = () => {
  const Categories = useLocation();
  const navigate = useNavigate();
  const { _id, categoryName, userid, useremail } = Categories.state;
  const [newCategoryName, setNewCategoryName] = useState(categoryName);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://140.238.152.2/api/category/edit/${_id}`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        _id,
        categoryName: newCategoryName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        navigate(`/category/${userid}`, {
          state: {
            userid: userid,
            useremail: useremail,
          },
        });
      });
  };

  return (
    <div className="auth-inner">
      <form onSubmit={handleSubmit}>
        <h4>Edit Category ({categoryName})</h4>

        <div className="mb-3">
          <label>Category Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Category"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
