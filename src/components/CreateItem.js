import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";

const CreateItem = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userid, useremail } = location.state;
  const [category, setCategory] = useState("");
  const [item_name, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [owner, setOwner] = useState(useremail);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5001/api/inventory/create", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        category,
        item_name,
        price,
        owner,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(`Created item ${item_name} successfully!!`);
        navigate(`/inventory/${userid}`, {
          state: {
            userid,
            useremail,
          },
        });
      });
  };

  return (
    <div className="auth-inner">
      <form onSubmit={handleSubmit}>
        <h3>Add Item</h3>

        <div className="mb-3">
          <label>Category</label>
          <input
            type="text"
            className="form-control"
            placeholder="Category"
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Item Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Item Name"
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Price</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            placeholder="Enter Price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Owner</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Owner"
            value={owner}
            disabled
            onChange={(e) => setOwner(e.target.value)}
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

export default CreateItem;