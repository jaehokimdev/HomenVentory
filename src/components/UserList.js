import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Header from "./Header";
import "./UserList.css";
import { Table } from "react-bootstrap";
import UserTableRow from "./UserTableRow";

const UserList = () => {
  const [allUserData, setAllUserData] = useState([]);
  const [userData, setUserData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetch("http://localhost:5001/api/user/getAll", {
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
        setAllUserData(data.data);
      });
  }, []);

  const DataTable = () => {
    const loginUser = allUserData.find(
      (user) => user._id === location.state.useerid
    );
    let loginUserList = null;
    if (loginUser.roll === "admin") {
      loginUserList = allUserData;
    } else if (loginUser.roll === "owner") {
      loginUserList = allUserData.filter(
        (user) => user.roll === "owner" || user.roll !== "admin"
      );
    } else {
      loginUserList = allUserData.filter(
        (user) => user.id === location.state.useerid
      );
    }
    return loginUserList.map((user, i) => {
      return <UserTableRow user={user} key={i} />;
    });
  };

  return (
    <div>
      <Header userid={location.state.userid} />
      <div className="userdetails-body">
        <h2>User List ({location.state.useremail})</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Roll</th>
            </tr>
          </thead>
          <tbody>{DataTable()}</tbody>
        </Table>
      </div>
    </div>
  );
};

export default UserList;
