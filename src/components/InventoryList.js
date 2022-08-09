import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import "./InventoryList.css";
import { Table } from "react-bootstrap";
import InventoryTableRow from "./InventoryTableRow";
import { Button } from "react-bootstrap";

const InventoryList = () => {
  const [allInventoryData, setAllInventoryData] = useState([]);
  const [userInventoryData, setUserInventoryData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { userid, useremail, userroll } = location.state;

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
        userroll,
      },
    });
  };

  const DataTable = () => {
    fetch("http://localhost:5001/api/inventory/item/:owner", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        useremail: useremail,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserInventoryData(data.data);
      });

    if (userroll === "admin") {
      return allInventoryData.map((item, i) => {
        return (
          <InventoryTableRow
            items={item}
            key={i}
            userid={location.state.userid}
            useremail={location.state.useremail}
          />
        );
      });
    } else {
      return userInventoryData.map((item, i) => {
        return (
          <InventoryTableRow
            items={item}
            key={i}
            userid={location.state.userid}
            useremail={location.state.useremail}
          />
        );
      });
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
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>{DataTable()}</tbody>
        </Table>
      </div>
    </div>
  );
};

export default InventoryList;
