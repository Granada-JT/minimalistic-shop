import { Button, Card, Col, ListGroup, Row, } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function ProductView() {

	// The "useParams" hook allows us to retrieve the productId passed via the URL.
	const {productId} = useParams()

	const { user } = useContext(UserContext);

	// an object with methods to redirect user.
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);

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

	const enroll = (productId) => {

		fetch(`${ process.env.REACT_APP_API_URL }/users/enroll`, {
		method: "POST",
		headers: {
		  "Content-Type": "application/json",
		  Authorization: `Bearer ${ localStorage.getItem('token') }`
		},
		body: JSON.stringify({
		  productId: productId
		})
		})
		.then(res => res.json())
		.then(data => {

		console.log(data);

		if(data){
			Swal.fire({
				title: "Successfully enrolled",
				icon: "success",
				text: "You have successfully enrolled for this product."
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
        <Card style={{ width: '18rem' }} >
        <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{description}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>{price}</ListGroup.Item>
                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>
            <Card.Body>
                <Card.Link href="#">Add to Cart</Card.Link>
                <Card.Link href="#">Buy Now</Card.Link>
            </Card.Body>
        </Card>
    );
}