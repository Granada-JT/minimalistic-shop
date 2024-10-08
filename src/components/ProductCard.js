import { Button, Card, Col, ListGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../UserContext";
import { useContext } from "react";

export default function ProductCard({ productProp }) {
  const { _id, name, description, price, imgSrc } = productProp;
  const { user } = useContext(UserContext);
  const quantity = 1;
  const navigate = useNavigate();

  // This code block is used to create an order and automatically add it to the cart.
  const order = (_id) => {
    fetch(`${process.env.REACT_APP_API_URL}/orders/createOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        productId: _id,
        quantity: quantity,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data) {
          Swal.fire({
            title: "Something went wrong",
            icon: "error",
            text: "Please try again.",
          });
        }
      });
  };

  const addToCart = () => {
    fetch(`${process.env.REACT_APP_API_URL}/cart/addToCart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((cart) => {
        if (cart) {
          Swal.fire({
            icon: "success",
            text: "You have successfully created an order and added this product to cart.",
          });
          navigate("/products");
        } else {
          Swal.fire({
            title: "Something went wrong",
            icon: "error",
            text: "Please try again.",
          });
        }
      });
  };

  return (
    <Card
      id="productCard"
      style={{
        height: "100%",
        maxHeight: "550px",
      }}
    >
      <Link to={`/products/${_id}`}>
        <Card.Img id="productCardImg" variant="top" src={imgSrc} />
      </Link>
      <Card.Body
        as={Link}
        to={`/products/${_id}`}
        style={{
          textDecoration: "none",
          height: "100%",
        }}
      >
        <Card.Title>
          {name.length > 50 ? `${name.slice(0, 50)}...` : name}
        </Card.Title>
        <Card.Text className="p-1">
          {description.length > 60
            ? `${description.slice(0, 60)}...`
            : description}
        </Card.Text>
      </Card.Body>
      <ListGroup
        as={Link}
        to={`/products/${_id}`}
        style={{ textDecoration: "none" }}
        className="list-group-flush border-0"
      >
        <ListGroup.Item>Price: ₱{price}</ListGroup.Item>
      </ListGroup>
      <Card.Body className="d-flex justify-content-center">
        <Col className="d-flex justify-content-center">
          <>
            {user.id !== null ? (
              <Button
                type="submit"
                id="submitBtn"
                className="mx-2 border-0"
                style={{ backgroundColor: "#3B638C" }}
                onClick={() => {
                  order(_id);
                  addToCart();
                }}
              >
                Add to Cart
              </Button>
            ) : (
              <Button
                type="submit"
                id="submitBtn"
                className="mx-2 border-0"
                style={{ backgroundColor: "#3B638C" }}
                as={Link}
                to="/login"
              >
                Add to Cart
              </Button>
            )}
          </>
        </Col>
      </Card.Body>
    </Card>
  );
}
