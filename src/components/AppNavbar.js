import {Link, NavLink} from 'react-router-dom';
import {Navbar, Nav, Container} from 'react-bootstrap';
import {useContext} from 'react';
import UserContext from '../UserContext';



export default function AppNavbar() {
	const { user } = useContext(UserContext);
  
	console.log(user);
  
	return (
	  <Navbar expand="lg" className="bg-body-tertiary">
		<Container fluid>
		  <Navbar.Brand as={Link} to="/">
			My Shop
		  </Navbar.Brand>
		  <Navbar.Toggle aria-controls="basic-navbar-nav" />
		  <Navbar.Collapse id="basic-navbar-nav">
			<Nav className="ms-auto">
			  <Nav.Link as={NavLink} to="/">
				Home
			  </Nav.Link>
			  <Nav.Link as={NavLink} to="/products">
				Products
			  </Nav.Link>
  
			  {user.id !== null ? (
				<>
				  {user.isAdmin ? (
					<>
					  <Nav.Link as={NavLink} to="/addCourse">Add Product</Nav.Link>
					  <Nav.Link as={NavLink} to="/logout">Logout</Nav.Link>
					</>
				  ) : (
					<>
					  <Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>
					  <Nav.Link as={NavLink} to="/logout">Logout</Nav.Link>
					</>
				  )}
				</>
			  ) : (
				<>
				  <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
				  <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
				</>
			  )}
			</Nav>
		  </Navbar.Collapse>
		</Container>
	  </Navbar>
	);
  }