import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";

const CreateItem = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userid, useremail, userroll } = location.state;
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("Office");
  const [item_name, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [owner, setOwner] = useState(useremail);

  useEffect(() => {
    fetch("http://localhost:5001/api/category/getAll", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.data);
      });
  }, []);

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
            userroll,
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
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option value={c.categoryName}>{c.categoryName}</option>
            ))}
          </Form.Select>
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
            disabled={userroll !== "admin"}
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
