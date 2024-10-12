import { Button, Form } from "react-bootstrap";
import { useContext, useState } from "react";
import BannerTwoColumns from "../components/BannerTwoColumns";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../UserContext";
import bgImage from "../images/background-loginPage.jpg";
import colImage from "../images/background1-login.webp";

export default function Login() {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  function authenticateUser(e) {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    loginUser({ email, password });
  }

  function validateForm() {
    let valid = true;
    let newErrors = {
      email: "",
      password: "",
    };

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    if (password.length < 8) {
      newErrors.password = "Please enter a valid password.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }

  function loginUser(credentials) {
    if (!validateForm()) {
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access) {
          localStorage.setItem("token", data.access);
          getUserDetails(data.access);
        } else {
          Swal.fire({
            title: "Login Failed",
            icon: "error",
            text: "Please check your login credentials and try again.",
          });
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "An error occurred. Please try again later.",
        });
      });
  }

  function getUserDetails(token) {
    fetch(`${process.env.REACT_APP_API_URL}/users/userDetails`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser({
          id: data._id,
          isAdmin: data.isAdmin,
          firstName: data.firstName,
        });

        Swal.fire({
          title: "Login Successful",
          icon: "success",
          text: `Welcome back ${data.firstName}!`,
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "An error occurred. Please try again later.",
        });
      });
  }

  const data = {
    backgroundImage: bgImage,
    leftImage: colImage,
    forms:
      user.id !== null ? (
        <Navigate to="/" />
      ) : (
        <Form
          noValidate
          onSubmit={authenticateUser}
          className="d-flex flex-column"
        >
          <h2 className="my-5 text-center">Login</h2>
          <Form.Group className="mb-3" controlId="Email address">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!errors.email}
            />
            {errors.email && (
              <Form.Text className="text-danger">{errors.email}</Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="Password1">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={!!errors.password}
            />
            {errors.password && (
              <Form.Text className="text-danger">{errors.password}</Form.Text>
            )}
          </Form.Group>
          <Button variant="primary" type="submit" id="submitBtn">
            Login
          </Button>
        </Form>
      ),
  };

  return <BannerTwoColumns data={data} />;
}
