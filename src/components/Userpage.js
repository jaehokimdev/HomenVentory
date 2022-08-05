import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Header from "./Header";
import "./Userpage.css";

const Userpage = (props) => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.data);
      });
  }, []);
  return (
    <div>
      <Header userid={userData._id} useremail={userData.email} />
      <div className="userdetails-body">
        <h1>{`Hello! ${userData.fname} ${userData.lname}`}</h1>
        <p>Welcome to HOME nVentory</p>
      </div>
    </div>
  );
};

export default Userpage;