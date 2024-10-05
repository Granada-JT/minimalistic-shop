import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../UserContext";
import { useContext } from "react";
import "../App.css";

export default function AppNavbar() {
  const { user } = useContext(UserContext);

  return (
    <Navbar expand="lg" style={{ height: "94px" }}>
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="mt-3"
          style={{ fontSize: "24px", fontWeight: "bold" }}
        >
          My Shop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="
              me-md-auto
              my-2
              my-lg-0
              custom-nav
              d-flex
              align-items-center
              justify-content-end
              w-100
            "
            id="navHome"
            navbarScroll
          >
            <Nav.Link as={NavLink} to="/" className="ms-3 mt-3">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/products" className="ms-3 mt-3">
              Products
            </Nav.Link>
            {user.id !== null ? (
              <>
                {user.isAdmin ? (
                  <>
                    <Nav.Link
                      as={NavLink}
                      to="/addProduct"
                      className="ms-3 mt-3"
                    >
                      Add Product
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/logout" className="ms-3 mt-3">
                      Logout
                    </Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link as={NavLink} to="/profile" className="ms-3 mt-3">
                      Profile
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/logout" className="ms-3 mt-3">
                      Logout
                    </Nav.Link>
                  </>
                )}
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login" className="ms-3 mt-3">
                  Login
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/register"
                  className="ms-3 mt-3 me-md-0 "
                >
                  Sign Up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
