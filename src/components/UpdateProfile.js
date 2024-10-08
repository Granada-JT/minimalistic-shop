import { useEffect, useState } from "react";

const UpdateProfile = ({ onUpdateUserDetails, user }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const apiUrl = `${process.env.REACT_APP_API_URL}/users/profile`;
    const token = localStorage.getItem("token");

    const requestBody = {
      firstName,
      lastName,
      mobileNo,
    };

    fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then(() => {
        onUpdateUserDetails({ ...user, firstName, lastName, mobileNo });
        setMessage("Update success");
      })
      .catch((error) => {
        setMessage("An error occurred while updating the profile.");
        console.error(error);
      });
  };

  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/users/profile`;
    const token = localStorage.getItem("token");

    const fetchUserProfile = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setMobileNo(data.mobileNo);
      } catch (error) {
        setMessage(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="container mb-3">
      <h2>Update Profile</h2>
      <div className="form-group mb-3">
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          className="form-control"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          className="form-control"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="mobileNo">Mobile Number:</label>
        <input
          type="text"
          className="form-control"
          id="mobileNo"
          value={mobileNo}
          onChange={(e) => setMobileNo(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleUpdateProfile}>
        Update Profile
      </button>
      {message && <div className="mt-3">{message}</div>}
    </div>
  );
};

export default UpdateProfile;
