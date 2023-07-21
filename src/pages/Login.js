import { Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Login() {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

  // This function handles form submission for user authentication.
  function authenticateUser(e) {
    e.preventDefault();
    loginUser({ email, password });
  }

  // This function fetches the user details from the back end server for authentication.
  function loginUser(credentials) {
    fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    })
      .then(res => res.json())
      .then(data => {

        // This if statement will store the generated token to the localStorage if the user is successfully authenticated, and will return an error message if the user authentication failed.
        if (data.access) {
          localStorage.setItem("token", data.access);
          getUserDetails(data.access);
        } else {
          Swal.fire({
            title: "Login Failed",
            icon: "error",
            text: "Please check your login credentials and try again."
          });
        }
      })
      .catch(error => {
        console.error(error);
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "An error occurred. Please try again later."
        });
      });
  }

  // This function retrieves user details after successful login using the access token. It returns a personalized login message with the user's first name.
  function getUserDetails(token) {
    fetch(`${process.env.REACT_APP_API_URL}/users/userDetails`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setUser({
          id: data._id,
          isAdmin: data.isAdmin,
          firstName: data.firstName
        });

        Swal.fire({
          title: "Login Successful",
          icon: "success",
          text: `Welcome back ${data.firstName}!`
        });
      })
      .catch(error => {
        console.error(error);
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "An error occurred. Please try again later."
        });
      });
  }

  useEffect(() => {
    setIsActive(email !== "" && password !== "");
  }, [email, password]);

  return (
    user.id !== null ? (
      <Navigate to="/" />
    ) : (
      <Form onSubmit={authenticateUser}>
        <h1 className="my-5 text-center">Login</h1>
        <Form.Group className="mb-3" controlId="Email address">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Password1">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
        {
          isActive ? (
            <Button variant="primary" type="submit" id="submitBtn">
              Login
            </Button>
          ) : (
            <Button variant="danger" type="submit" id="submitBtn" disabled>
              Login
            </Button>
          )
        }
      </Form>
    )
  );
}