import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";

const InventoryTableRow = (props) => {
  const { _id, categoryName } = props.category;
  const navigate = useNavigate();

  const editCategory = () => {
    navigate(`/editcategory/${_id}`, {
      state: {
        _id,
        categoryName,
        userid: props.userid,
        useremail: props.useremail,
      },
    });
  };

  return (
    <tr>
      <td>{categoryName}</td>
      {categoryName !== "Office" ? (
        <td>
          <Button
            className="me-3"
            size="sm"
            onClick={editCategory}
            variant="primary"
          >
            Edit
          </Button>
        </td>
      ) : (
        <td></td>
      )}
    </tr>
  );
};

export default InventoryTableRow;
