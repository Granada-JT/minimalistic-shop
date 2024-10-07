import { Col, Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "../UserContext";
import cartIcon from "../images/cart.svg";
import "../App.css";

export default function AppNavbar() {
  const { user } = useContext(UserContext);
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar expand="md" style={{ height: "94px" }} expanded={expanded}>
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="mt-3"
          style={{
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          Minimalistic Shop
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
          className="mt-3"
        >
          {expanded ? <span>&#x2715;</span> : <span>&#9776;</span>}
        </Navbar.Toggle>
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
                    {user.id !== null && !user.isAdmin && (
                      <Col
                        md={1}
                        className="
                          d-flex
                          align-self-end
                          justify-content-center
                        "
                      >
                        <Nav.Link as={NavLink} to="/cart">
                          <img src={cartIcon} alt="cart" />
                        </Nav.Link>
                      </Col>
                    )}
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
