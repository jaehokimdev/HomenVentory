import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";

const EditUser = () => {
  const user = useLocation();
  const navigate = useNavigate();
  const {
    _id,
    fname,
    lname,
    email,
    password,
    roll,
    status,
    userid,
    useremail,
  } = user.state;
  const [newFname, setNewFname] = useState(fname);
  const [newLname, setNewLname] = useState(lname);
  const [newEmail, setNewEmail] = useState(email);
  const [newPassword, setNewPassword] = useState(password);
  const [newRoll, setNewRoll] = useState(roll);
  const [newStatus, setNewStatus] = useState(status);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5001/api/user/edit/${_id}`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        _id,
        newFname,
        newLname,
        newEmail,
        newPassword,
        newRoll,
        newStatus,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        navigate(`/userlist/${userid}`, {
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
        <h3>Edit User ({email})</h3>

        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            value={newFname}
            onChange={(e) => setNewFname(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Last name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            value={newLname}
            onChange={(e) => setNewLname(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Roll</label>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setNewRoll(e.target.value)}
          >
            <option>Select Your Roll</option>
            <option value="admin">Admin</option>
            <option value="owner">Owner</option>
            <option value="user">User</option>
          </Form.Select>
        </div>

        <div className="mb-3">
          <label className="me-3">Active or Inactive</label>
          <Form.Check
            inline
            label="Active"
            name="status"
            type="radio"
            id="active"
            onChange={() => setNewStatus(true)}
          />
          <Form.Check
            inline
            label="Inactive"
            name="status"
            type="radio"
            id="inactive"
            onChange={() => setNewStatus(false)}
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
