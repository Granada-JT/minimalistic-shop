import { Button, Card, Col, Container, Form, ListGroup, Row, } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function ProductView() {

	const { user } = useContext(UserContext);

	// The "useParams" hook allows us to retrieve the productId passed via the URL.
	const { productId } = useParams();

	console.log(productId)
	// an object with methods to redirect user.
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);
	const [quantity,setQuantity] = useState(1);

	useEffect(() => {
		console.log(productId)

		// a fetch request that will retrieve the details of a specific product
		fetch(`${ process.env.REACT_APP_API_URL }/products/${productId}`)
		.then(res => res.json())
		.then(data => {
			console.log(data)

			setName(data.name);
			setDescription(data.description);
			setPrice(data.price);
		})
	}, [productId])

	// This code block is used to create an order and automatically add it to the cart. (still needs to add the add to cart code.)
	const order = (productId) => {

		fetch(`${ process.env.REACT_APP_API_URL }/orders/createOrder`, {
		method: "POST",
		headers: {
		  "Content-Type": "application/json",
		  Authorization: `Bearer ${ localStorage.getItem('token') }`
		},
		body: JSON.stringify({
		  productId: productId,
		  quantity: quantity
		})
		})
		.then(res => res.json())
		.then(data => {

		console.log(data);

		if(data){
			Swal.fire({
				icon: "success",
				text: "You have successfully ordered for this product."
			})

			// Allow us to navigate the user back to the product page programmatically instead of using component.
			navigate("/products")
		}
		else {
			Swal.fire({
				title: "Something went wrong",
				icon: "error",
				text: "Please try again."
			})
		}

		});

	}

    return (

	<Container>
		<Row>
			<Col>
				<Card className="my-5 ms-lg-5 border-0" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
					<Card.Img variant="center" src="https://www.gensh.in/fileadmin/Database/Weapons/Catalyst/kagurasVerity_weapCardA.png" className="m-2" />
				</Card>
			</Col>
			<Col>
				<Card className="my-5 me-lg-5 border-0" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
					<Card.Body>
						<Card.Title className="py-2" style={{ fontSize: '2.5rem' }}>{name}</Card.Title>
						<Card.Text className="py-2" style={{ fontSize: '1rem', textAlign: 'justify' }}>{description}</Card.Text>
					</Card.Body>
						<ListGroup>
							<ListGroup.Item style={{ fontSize: '2rem', border: 'none' }}>Price: ₱{price}</ListGroup.Item>
							{/* Add more list items here if needed */}
							<ListGroup.Item style={{ border: 'none' }}>
							<Form.Label>Quantity:</Form.Label>

							{/* This code block does not allow any negative values and 0 to be entered into the quantity field. */}
							<Form.Control 
								type="text" 
								pattern="[0-9]*"
								placeholder="Enter Quantity" 
								required 
								minLength={1}
								value={quantity}
								onChange={e => {
								const value = e.target.value;
								if (!value.includes('-') && !value.includes('--') && !value.includes('e') && value >= 1) {
									setQuantity(parseInt(value, 10));
								} else {
									setQuantity('');
								}
								}}
							/>
							</ListGroup.Item>
						</ListGroup>
						<Row>
							<Col lg={6}>
								<Card.Body style={{ display: 'flex', justifyContent: 'center' }}>
								{user.id !== null ?
								<Button variant="warning" type="submit" id="submitBtn" className="mx-2 btn-lg w-100"
								onClick={() => order(productId)}>
									Add to Cart
								</Button>
								:
								<Button variant="warning" type="submit" id="submitBtn" className="mx-2 btn-lg w-100"
								as={Link} to="/login">
									Add to Cart
								</Button>
								}
								</Card.Body>
							</Col>

							 {/* Still need to edit this after doing the dedicated checkout page, because this must redirect to the checkout page and skip the add to cart function. */}
							<Col lg={6}>
								<Card.Body style={{ display: 'flex', justifyContent: 'center' }}>
								<Button variant="danger" type="submit" id="submitBtn" className="mx-2 btn-lg w-100">
									Buy Now
								</Button>
								</Card.Body>
							</Col>
						</Row>

				</Card>
			</Col>
		</Row>
	</Container>

    );
}