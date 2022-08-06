import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";

const UserTableRow = (props) => {
  const { _id, fname, lname, email, roll, status } = props.user;
  const [deleteuser, setDeleteuser] = useState();
  const navigate = useNavigate();

  const editUser = () => {
    navigate(`/edituser/${_id}`);
  };

  const deleteUser = () => {
    fetch(`http://localhost:5001/api/user/delete/${_id}`, {
      method: "DELETE",
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
        setDeleteuser(data);
      });
  };

  return (
    <tr>
      <td>{fname}</td>
      <td>{lname}</td>
      <td>{email}</td>
      <td>{roll}</td>
      <td>
        {status ? (
          <Badge bg="success">Active</Badge>
        ) : (
          <Badge bg="danger">Inactive</Badge>
        )}
      </td>
      <td>
        <Button className="me-3" onClick={editUser} size="sm" variant="primary">
          Edit
        </Button>
        <Button onClick={deleteUser} size="sm" variant="danger">
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default UserTableRow;
