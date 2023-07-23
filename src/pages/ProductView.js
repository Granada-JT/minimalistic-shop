import { Button, Card, Col, Container, ListGroup, Row, } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function ProductView() {

	// The "useParams" hook allows us to retrieve the productId passed via the URL.
	const { productId } = useParams();

	console.log(productId)
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

	const order = (productId) => {

		fetch(`${ process.env.REACT_APP_API_URL }/users/createOrder`, {
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
				title: "Successfully ordered",
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
    <Card className="my-5 ms-lg-5" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Card.Img variant="center" src="https://www.gensh.in/fileadmin/Database/Weapons/Catalyst/kagurasVerity_weapCardA.png" style={{ margin: 'auto' }} />
    </Card>
  </Col>
  <Col>
    <Card className="my-5 me-lg-5" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Card.Body>
        <Card.Title className="py-2" style={{ fontSize: '2.5rem' }}>{name}</Card.Title>
        <Card.Text className="py-2" style={{ fontSize: '1rem', textAlign: 'justify' }}>{description}</Card.Text>
      </Card.Body>
      <ListGroup>
        <ListGroup.Item style={{ fontSize: '2rem' }}>Price: ₱{price}</ListGroup.Item>
        {/* Add more list items here if needed */}
      </ListGroup>
      <Card.Body style={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="danger" type="submit" id="submitBtn" className="mx-2">
          Add to Cart
        </Button>
        <Button variant="danger" type="submit" id="submitBtn" className="mx-2">
          Buy Now
        </Button>
      </Card.Body>
    </Card>
  </Col>
</Row>

</Container>

    );
}