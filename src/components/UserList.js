import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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

    if (userData.roll === "admin") {
      return allUserData.map((user, i) => {
        return (
          <UserTableRow
            user={user}
            key={i}
            userid={location.state.userid}
            useremail={location.state.useremail}
          />
        );
      });
    } else {
      return (
        <UserTableRow
          user={userData}
          key={userData.id}
          userid={location.state.userid}
          useremail={location.state.useremail}
        />
      );
    }
  };

  return (
    <div>
      <Header
        userid={location.state.userid}
        useremail={location.state.useremail}
        userroll={location.state.userroll}
      />
      <div className="userdetails-body">
        <h2>User List ({location.state.useremail})</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Roll</th>
              <th>Status</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>{DataTable()}</tbody>
        </Table>
      </div>
    </div>
  );
};

export default UserList;
