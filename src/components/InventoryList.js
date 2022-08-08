import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import "./InventoryList.css";
import { Table } from "react-bootstrap";
import InventoryTableRow from "./InventoryTableRow";
import { Button } from "react-bootstrap";

const InventoryList = () => {
  const [allInventoryData, setAllInventoryData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { userid, useremail } = location.state;

  useEffect(() => {
    fetch("http://localhost:5001/api/inventory/getAll", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAllInventoryData(data.data);
      });
  }, []);

  const createItem = () => {
    navigate("/createitem/", {
      state: {
        userid,
        useremail,
      },
    });
  };

  const DataTable = () => {
    // const loginUser = allUserData.find(
    //   (user) => user._id === location.state.useerid
    // );
    // console.log(loginUser);
    // let loginUserList = null;
    // if (loginUser.roll === "admin") {
    //   loginUserList = allUserData;
    // } else if (loginUser.roll === "owner") {
    //   loginUserList = allUserData.filter(
    //     (user) => user.roll === "owner" || user.roll !== "admin"
    //   );
    // } else {
    //   loginUserList = allUserData.filter(
    //     (user) => user.id === location.state.useerid
    //   );
    // }
    return allInventoryData.map((items, i) => {
      return (
        <InventoryTableRow
          items={items}
          key={i}
          userid={location.state.userid}
          useremail={location.state.useremail}
        />
      );
    });
  };

  return (
    <div>
      <Header
        userid={location.state.userid}
        useremail={location.state.useremail}
      />
      <div className="userdetails-body">
        <h2>
          Inventory List ({location.state.useremail}){" "}
          <Button variant="success" onClick={createItem}>
            Add item
          </Button>
        </h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Category</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>{DataTable()}</tbody>
        </Table>
      </div>
    </div>
  );
};

export default InventoryList;
