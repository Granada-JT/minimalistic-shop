import { Link, NavLink } from "react-router-dom";
import { Col, Container, Form, Navbar, Nav, Row } from "react-bootstrap";
import { useContext } from "react";
import cartIcon from "../images/cart.svg";
import UserContext from "../UserContext";
import searchIcon from "../images/search.svg";
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
            className="me-md-auto my-2 my-lg-0 custom-nav"
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
          <Row className="align-items-center mt-3">
            <Col md={8} className="mb-2 mb-md-0">
              <Form>
                <Form.Control
                  type="search"
                  placeholder="Search products"
                  aria-label="Search"
                  style={{ fontSize: "12px", width: "100%" }}
                />
              </Form>
            </Col>
            <Col md={2}>
              <Nav.Link style={{ width: "100%", padding: "auto" }}>
                <img src={searchIcon} alt="Search" />
              </Nav.Link>
            </Col>
            {user.id !== null && !user.isAdmin && (
              <Col md={2}>
                <Nav.Link
                  as={NavLink}
                  to="/cart"
                  style={{ width: "100%", padding: "auto" }}
                >
                  <img src={cartIcon} alt="cart" />
                </Nav.Link>
              </Col>
            )}
          </Row>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
