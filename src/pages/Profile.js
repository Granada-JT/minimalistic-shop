import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Navigate } from "react-router-dom";

import UserContext from "../UserContext";
import ResetPassword from "../components/ResetPassword";
import UpdateProfile from "../components/UpdateProfile";

import profilePic from "../images/kokomiDp.webp";
import "../App.css";

export default function Profile() {
  const { user } = useContext(UserContext);
  const [details, setDetails] = useState({});

  const handleUpdateUserDetails = (updatedDetails) => {
    setDetails(updatedDetails);
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/userDetails`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Set the user state values with the user details upon successful login.
        if (typeof data._id !== "undefined") {
          setDetails(data);
        }
      });
  }, []);

  return user.id === null ? (
    <Navigate to="/products" />
  ) : (
    <>
      <Container id="profileContainer" className="mb-5">
        <Row>
          <Col className="d-flex justify-content-center">
            <img src={profilePic} alt="Profile Picture" id="profilePic" />
          </Col>
          <Col lg={6} className="text-white">
            <h1 className="my-5">Profile</h1>
            {/* <h2 className="mt-3">James Dela Cruz</h2> */}
            <h2 className="mt-3">{`${details.firstName} ${details.lastName}`}</h2>
            <hr />
            <h4>Contact Details</h4>
            <ul>
              {/* <li>Email: {user.email}</li> */}
              <li>Email: {details.email}</li>
              {/* <li>Mobile No: 09266772411</li> */}
              <li>Mobile No: {details.mobileNo}</li>
            </ul>
          </Col>
        </Row>

        <Row className="pt-4 mt-4 text-white" id="rowProfile">
          <Col lg={6}>
            <UpdateProfile
              onUpdateUserDetails={handleUpdateUserDetails}
              user={details}
            />
          </Col>
          <Col lg={6}>
            <ResetPassword />
          </Col>
        </Row>
      </Container>
    </>
  );
}
