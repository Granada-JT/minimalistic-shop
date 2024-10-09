import { Button, Form } from "react-bootstrap";
import { useContext, useState } from "react";
import BannerTwoColumns from "../components/BannerTwoColumns";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../UserContext";
import bgImage from "../images/background-signUpPage.jpg";
import colImage from "../images/colImage-signUpPage.webp";

export default function Register() {
  const { user } = useContext(UserContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    let valid = true;
    let newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      mobileNo: "",
      password: "",
      confirmPassword: "",
    };

    if (firstName === "") {
      newErrors.firstName = "First name is required.";
      valid = false;
    }
    if (lastName === "") {
      newErrors.lastName = "Last name is required.";
      valid = false;
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }
    if (mobileNo.length < 1 || !/^\d+$/.test(mobileNo)) {
      newErrors.mobileNo = "Please enter a valid mobile number";
      valid = false;
    }
    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
      valid = false;
    }
    if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  function registerUser(e) {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/users/checkEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          Swal.fire({
            title: "Registration Failed",
            icon: "error",
            text: "This email address you entered is already registered. Please login or try again.",
          });
        } else {
          fetch(`${process.env.REACT_APP_API_URL}/users/registration`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              firstName: firstName,
              lastName: lastName,
              email: email,
              mobileNo: mobileNo,
              password: password,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.access) {
                setFirstName("");
                setLastName("");
                setEmail("");
                setMobileNo("");
                setPassword("");
                setConfirmPassword("");
                setErrors({});

                Swal.fire({
                  title: "Registration Successful",
                  icon: "success",
                  text: `Welcome, ${firstName}!`,
                });
              } else {
                Swal.fire({
                  title: "Registration Failed",
                  icon: "error",
                  text: "The mobile number you entered is already registered. Please log in or use a different mobile number.",
                });
              }
            });
        }
      });
  }

  const data = {
    backgroundImage: bgImage,
    leftImage: colImage,
    forms:
      user.id !== null ? (
        <Navigate to="/products" />
      ) : (
        <Form noValidate onSubmit={registerUser} className="d-flex flex-column">
          <h2 className="my-5 text-center">Sign Up</h2>
          <Form.Group className="mb-3" controlId="FirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              isInvalid={!!errors.firstName}
            />
            {errors.firstName && (
              <Form.Text className="text-danger">{errors.firstName}</Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="LastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              isInvalid={!!errors.lastName}
            />
            {errors.lastName && (
              <Form.Text className="text-danger">{errors.lastName}</Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="Email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!errors.email}
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            />
            {errors.email && (
              <Form.Text className="text-danger">{errors.email}</Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="MobileNo">
            <Form.Label>Mobile No</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your 11-digit mobile number"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              isInvalid={!!errors.mobileNo}
            />
            {errors.mobileNo && (
              <Form.Text className="text-danger">{errors.mobileNo}</Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="Password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={!!errors.password}
            />
            {errors.password && (
              <Form.Text className="text-danger">{errors.password}</Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="ConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              isInvalid={!!errors.confirmPassword}
            />
            {errors.confirmPassword && (
              <Form.Text className="text-danger">
                {errors.confirmPassword}
              </Form.Text>
            )}
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            id="submitBtn"
            className="mb-5"
          >
            Sign Up
          </Button>
        </Form>
      ),
  };

  return <BannerTwoColumns data={data} />;
}
