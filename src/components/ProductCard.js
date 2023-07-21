import { Button, Card, Col, ListGroup, Row, } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function ProductCard({productProp}) {

    const {_id, name, description, price } = productProp;

    return (
        <Card style={{ width: '18rem' }} className='my-5'>
            <Link to={`/products/${_id}`}>
            <Card.Img variant="top" src="https://www.gensh.in/fileadmin/Database/Weapons/Catalyst/kagurasVerity_weapCardA.png" />
            </Link>
            <Card.Body as={Link} to={`/products/${_id}`} style={{ textDecoration: 'none' }}>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{description}</Card.Text>
            </Card.Body>
            <ListGroup as={Link} to={`/products/${_id}`} style={{ textDecoration: 'none' }} className="list-group-flush">
                <ListGroup.Item>Price: {price}</ListGroup.Item>
        {/*         <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item> */}
            </ListGroup>
            <Card.Body>
                    <Button variant="danger" type="submit" id="submitBtn" className="mx-2">
                    Add to Cart
                    </Button>
                    <Button variant="danger" type="submit" id="submitBtn" className="mx-2">
                    Buy Now
                    </Button>
            </Card.Body>
        </Card>
    );
}