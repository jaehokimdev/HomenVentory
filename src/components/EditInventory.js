import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";

const EditUser = () => {
  const items = useLocation();
  const navigate = useNavigate();
  const { _id, category, item_name, price, owner, userid, useremail } =
    items.state;
  const [newCategory, setNewCategory] = useState(category);
  const [newItem_name, setNewItem_name] = useState(item_name);
  const [newPrice, setNewPrice] = useState(price);
  const [newOwner, setNewOwner] = useState(owner);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://140.238.152.2/api/inventory/edit/${_id}`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        _id,
        newCategory,
        newItem_name,
        newPrice,
        newOwner,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        navigate(`/inventory/${userid}`, {
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
        <h3>Edit Item ({item_name})</h3>

        <div className="mb-3">
          <label>Category</label>
          <input
            type="text"
            className="form-control"
            placeholder="Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Item name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Item name"
            value={newItem_name}
            onChange={(e) => setNewItem_name(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Price</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            placeholder="Enter Price"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Owner</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Owner"
            value={newOwner}
            onChange={(e) => setNewOwner(e.target.value)}
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

export default EditUser;
