import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://140.238.152.2:5555/createbasedata", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((data) => {});
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://140.238.152.2:5555/login-user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "ok") {
          setLoginSuccess(true);
          window.localStorage.setItem("token", data.data);
          navigate(`/userpage/${data.id}`);
        } else {
          setErrorMessage(data.error);
          setLoginSuccess(false);
        }
      });
  };
  return (
    <div className="auth-inner">
      <form onSubmit={handleSubmit}>
        <h3>Sign In</h3>
        <div className="mb-3">
          <label className="mb-2">Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="mb-2">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {!loginSuccess && <p style={{ color: "red" }}>{errorMessage}</p>}

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
