import { Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Login() {

	// Allows us to consume the User context object and it's properties to be used for user validation.
	const { user, setUser } = useContext(UserContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// State to determine whether the submit button is enabled or not.
	const [ isActive, setIsActive] = useState(false);

	function authenticateUser(e) {

		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,				
				password: password
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
            console.log(data.access);

			if(data.access) {

				// Set the token of the authenticated user in the local storage.
				// Syntax:
					// localStorage.setItem("propertyName", value);
				localStorage.setItem("token", data.access);

				// Sets the global user state to have the properties obtained from localStorage.
				// setUser({
				// 	access: localStorage.getItem("token")
				// })

				// We will invoke the function for retrieving the user details
				retrieveUserDetails(data.access);

				// alert("You are now logged in.")
				Swal.fire({
					title: "Login Successful",
					icon: "success",
					text: "Welcome to Zuitt!"
				});
			} else {
				// alert(`${email} does not exist.`)
				Swal.fire({
					title: "Authentication Failed",
					icon: "error",
					text: "Check your login details and try again."
				});
			}
		})
		setEmail('');
		setPassword('');
	};


	const retrieveUserDetails = (token) => {

		// The token will be sent as part of the request's header information.
		// We put "Bearer" in front of the token to follow the implementation standards for JWTs.
		fetch(`${process.env.REACT_APP_API_URL}/users/userDetails`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);

			// Changes the global "user" state to store the "id" and the "isAdmin" property of the user which will be used for validation accross the whole application.
			setUser({
				id: data._id,
				isAdmin: data.isAdmin
			})

		})
	}

	useEffect(() => {
	   	if (email !== "" && password !== "") {
	     		setIsActive(true)
	    } else {
	     		setIsActive(false)
	    }
	}, [email, password]);

	return (

		(user.id !== null) ?
			<Navigate to="/" />
			:
				<Form onSubmit={e => authenticateUser(e)}>
					<h1 className="my-5 text-center">Login</h1>

				    <Form.Group className="mb-3" controlId="Email address">
				    	<Form.Label>Email address</Form.Label>
				    	<Form.Control 
				    		type="email" 
				    		placeholder="Enter email" 
				    		required 
				    		value={email}
				    		onChange={e => {setEmail(e.target.value)}}
				    	/>
				    </Form.Group>

				    <Form.Group className="mb-3" controlId="Password1">
				    	<Form.Label>Password</Form.Label>
				    	<Form.Control 
				    		type="password" 
				    		placeholder="Enter password" 
				    		required 
				    		value={password}
				    		onChange={e => {setPassword(e.target.value)}}
				    	/>
				    </Form.Group>

				    {
				    	isActive
				    		? <Button variant="primary" type="submit" id="submitBtn">Login</Button>
				    		: <Button variant="danger" type="submit" id="submitBtn" disabled>Login</Button>
				    }

				</Form>
		
	)
};
