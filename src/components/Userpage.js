import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import "./Userpage.css";

const Userpage = (props) => {
  const [userData, setUserData] = useState([]);
  const params = useParams();

  useEffect(() => {
    fetch("http://140.238.152.2/userData", {
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
      <Header
        userid={params.id}
        useremail={userData.email}
        userroll={userData.roll}
      />
      <div className="userdetails-body">
        <h1>{`Hello! ${userData.fname} ${userData.lname}`}</h1>
        <p>Welcome to HOME nVentory</p>
      </div>
    </div>
  );
};

export default Userpage;
