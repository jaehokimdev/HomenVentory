import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";

const SignUp = (props) => {
  const location = useLocation();
  const { userid, useremail, userroll } = location.state;
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roll, setRoll] = useState("admin");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5001/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        fname,
        email,
        lname,
        password,
        roll,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(`Created user ${fname} ${lname} successfully!!`);
        navigate(`/userlist/${userid}`, {
          state: {
            userid: userid,
            useremail: useremail,
            userroll: userroll,
          },
        });
      });
  };

  return (
    <div className="auth-inner">
      <form onSubmit={handleSubmit}>
        <h3>Create User</h3>

        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            onChange={(e) => setFname(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Last name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            onChange={(e) => setLname(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Roll</label>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setRoll(e.target.value)}
          >
            <option value="admin">Administrator</option>
            <option value="user">User</option>
          </Form.Select>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
