import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Register() {

	const {user} = useContext(UserContext);

	// State hooks to store the values of the register form input fields.
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [mobileNo, setMobileNo] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	// State to determine whether the submit button is enabled or not.
	const [ isActive, setIsActive] = useState(false);

	// check if the values are successfully binded.
	console.log(firstName);
	console.log(lastName);
	console.log(email);
	console.log(mobileNo);
	console.log(password);
	console.log(confirmPassword);


	function registerUser(e) {

		// This code block prevents the page redirection via form submission.
		e.preventDefault();


        // This code block checks if the email address is already registered.
		fetch(`${process.env.REACT_APP_API_URL}/users/checkEmail`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email
			})
		})
		.then(res => res.json())
		.then(data => {

			if(data) {

                Swal.fire({
                    title: "Registration Failed",
                    icon: "error",
                    text: "This email address you entered is already registered. Please login or try again.",
                  });

			} else {

				fetch(`${process.env.REACT_APP_API_URL}/users/registration`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						firstName: firstName,
						lastName: lastName,
						email: email,
						mobileNo: mobileNo,
						password: password
					})
				})
				.then(res => res.json())
				.then(data => {
					console.log(data);

					if(data.access) {

						setFirstName("");
						setLastName("");
						setEmail("");
						setMobileNo("");
						setPassword("");
						setConfirmPassword("");

                        Swal.fire({
                            title: "Registration Successful",
                            icon: "success",
                            text: `Welcome, ${firstName} !`
                        });

					} else if(!data.access) {

                        Swal.fire({
                            title: "Registration Failed",
                            icon: "error",
                            text: "The mobile number you entered is already registered. Please log in or use a different mobile number."
                        });

                    } else {

                        Swal.fire({
                            title: "Registration Failed",
                            icon: "error",
                            text: "Sorry, there was an error during registration. Please try again later."
                        });

					}

				})
			}

		})

	};

    // This useEffect enables and disables the register button depending if the form fields has user input.
	useEffect(() => {

		if((firstName !== "" && lastName !== "" && email !== "" && mobileNo !== "" && password !== "" && confirmPassword !== "") && (password === confirmPassword) && (mobileNo.length === 11)) {
				setIsActive(true)
		} else {

				setIsActive(false)

		}

	}, [firstName, lastName, email, mobileNo, password, confirmPassword]);

	return (

        // This code block checks if the user is already logged in and will render the pages depending if they are logged in or not.
		(user.id !== null) ?
			<Navigate to="/products" />
		:
			<Form onSubmit={e => registerUser(e)}>
			  <h1 className="my=5 text-center">Register</h1>

			  <Form.Group className="mb-3" controlId="First Name">
			    <Form.Label>First Name</Form.Label>
			    <Form.Control 
			    	type="text" 
			    	placeholder="Enter your first name" 
			    	required
			    	value={firstName}
			    	onChange={e => {setFirstName(e.target.value)}}
			    />
			  </Form.Group>

			  <Form.Group className="mb-3" controlId="Last Name">
			    <Form.Label>Last Name</Form.Label>
			    <Form.Control 
			    	type="text" 
			    	placeholder="Enter your last name" 
			    	required 
			    	value={lastName}
			    	onChange={e => {setLastName(e.target.value)}}
			    />
			  </Form.Group>

			  <Form.Group className="mb-3" controlId="Email address">
			    <Form.Label>Email address</Form.Label>
			    <Form.Control 
			    	type="email" 
			    	placeholder="Enter your email e.g.(name@example.com)"  
			    	required
			    	value={email}
			    	onChange={e => {setEmail(e.target.value)}}
			    />
			  </Form.Group>

			  <Form.Group className="mb-3" controlId="Mobile No">
			    <Form.Label>Mobile No:</Form.Label>
			    <Form.Control 
			    	type="text" 
			    	placeholder="Enter your 11 digit mobile no."
			    	required 
			    	value={mobileNo}
			    	onChange={e => {setMobileNo(e.target.value)}}
			    />
			  </Form.Group>

			  <Form.Group className="mb-3" controlId="Password1">
			    <Form.Label>Password</Form.Label>
			    <Form.Control 
			    	type="password" 
			    	placeholder="Enter your password" 
			    	required 
			    	value={password}
			    	onChange={e => {setPassword(e.target.value)}}
			    />
			  </Form.Group>

			  <Form.Group className="mb-3" controlId="Password2">
			    <Form.Label>Confirm Password:</Form.Label>
			    <Form.Control 
			    	type="password" 
			    	placeholder="Confirm your password" 
			    	required 
			    	value={confirmPassword}
			    	onChange={e => {setConfirmPassword(e.target.value)}}
			    />
			  </Form.Group>

			  {
			  	isActive 
			  		? <Button variant="primary" type="submit" id="submitBtn">Register</Button>
			  		: <Button variant="danger" type="submit" id="submitBtn" disabled>Register</Button>
			  }

			</Form>
	)

};