import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";

const UserTableRow = (props) => {
  const { _id, fname, lname, email, password, roll, status } = props.user;
  const navigate = useNavigate();

  const editUser = () => {
    navigate(`/edituser/${_id}`, {
      state: {
        _id,
        fname,
        lname,
        email,
        password,
        roll,
        userid: props.userid,
        usereamil: props.useremail,
      },
    });
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
        _id,
      }),
    }).then(window.location.reload());
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
        {props.userid === _id ? null : (
          <Button onClick={deleteUser} size="sm" variant="danger">
            Delete
          </Button>
        )}
      </td>
    </tr>
  );
};

export default UserTableRow;
