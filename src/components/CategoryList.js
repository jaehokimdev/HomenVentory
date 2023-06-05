import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import "./InventoryList.css";
import { Table } from "react-bootstrap";
import CategoryTableRow from "./CategoryTableRow";
import { Button } from "react-bootstrap";

const CategoryList = () => {
  const [allCategoryData, setAllCategoryData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { userid, useremail, userroll } = location.state;

  useEffect(() => {
    fetch("http://140.238.152.2:5555/api/category/getAll", {
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
        setAllCategoryData(data.data);
      });
  }, []);

  const createCategory = () => {
    navigate("/createcategory/", {
      state: {
        userid,
        useremail,
        userroll,
      },
    });
  };

  const DataTable = () => {
    return allCategoryData.map((category, i) => {
      return (
        <CategoryTableRow
          category={category}
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
        userroll={location.state.userroll}
      />
      <div className="userdetails-body">
        <h2>
          Category List ({location.state.useremail}){" "}
          <Button variant="success" onClick={createCategory}>
            Add Category
          </Button>
        </h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>{DataTable()}</tbody>
        </Table>
      </div>
    </div>
  );
};

export default CategoryList;
