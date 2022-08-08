import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";

const InventoryTableRow = (props) => {
  const { _id, category, item_name, price, owner } = props.items;
  const navigate = useNavigate();

  const editItem = () => {
    navigate(`/edititem/${_id}`, {
      state: {
        _id,
        category,
        item_name,
        price,
        owner,
        userid: props.userid,
        useremail: props.useremail,
      },
    });
  };

  const deleteItem = () => {
    fetch(`http://localhost:5001/api/inventory/delete/${_id}`, {
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
      <td>{category}</td>
      <td>{item_name}</td>
      <td>${price.toFixed(2)}</td>
      <td>{owner}</td>
      <td>
        <Button className="me-3" size="sm" onClick={editItem} variant="primary">
          Edit
        </Button>
        <Button size="sm" onClick={deleteItem} variant="danger">
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default InventoryTableRow;
