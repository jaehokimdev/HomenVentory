import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = (props) => {
  const useremail = props.useremail;
  const userid = props.userid;
  const userroll = props.userroll;
  return (
    <div className="App-header">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link to={"/"} className="nav-link">
              HOME nVentory
            </Link>
          </Navbar.Brand>
          <Nav className="justify-content-end ">
            <Nav>
              <Link to={"/sign-up"} className="nav-link">
                Create User
              </Link>
            </Nav>
            <Nav>
              <Link
                to={`/userlist/${userid}`}
                state={{ useremail, userid }}
                className="nav-link"
              >
                User List
              </Link>
            </Nav>
            <Nav>
              <Link
                to={`/inventory/${userid}`}
                state={{ useremail, userid, userroll }}
                className="nav-link"
              >
                Inventory List
              </Link>
            </Nav>
            <Nav>
              <Link
                to={"/"}
                className="nav-link"
                onClick={() => window.localStorage.removeItem("token")}
              >
                Logout
              </Link>
            </Nav>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
