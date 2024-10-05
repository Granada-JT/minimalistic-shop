import {
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Swal from "sweetalert2";
import UserContext from "../UserContext";
import "../App.css";

export default function ProductView() {
  const { user } = useContext(UserContext);
  const { productId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [imgSrc, setImgSrc] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      setIsLoading(true);
      try {
        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
          .then((res) => res.json())
          .then((data) => {
            setName(data.name);
            setDescription(data.description);
            setPrice(data.price);
            setImgSrc(data.imgSrc);
            setIsLoading(false);
          });
      } catch (error) {
        console.error(error);
      }
    };

    getProduct();
  }, [productId]);

  // This code block is used to create an order and automatically add it to the cart.
  const order = (productId) => {
    fetch(`${process.env.REACT_APP_API_URL}/orders/createOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          Swal.fire({
            title: "Quantity is defaulted back to 1",
            text: "Order request has been received.",
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
    <Container>
      {isLoading ? (
        <Row
          id="userViewRow"
          className="
            d-flex
            justify-content-center
            align-items-center
          "
        >
          Loading Product Details
          <Spinner
            animation="border"
            style={{
              height: "40px",
              width: "40px",
              margin: "10px 0 0 10px",
            }}
          />
        </Row>
      ) : (
        <Row className="align-items-center" id="productViewCard">
          <Col lg={6}>
            <Card className="my-5 ms-lg-5 d-flex justify-content-center border-0">
              <Card.Img variant="center" src={imgSrc} className="m-2" />
            </Card>
          </Col>
          <Col lg={6} className="d-flex justify-content-center">
            <Card className="my-5 me-lg-5 border-0">
              <Card.Body>
                <Card.Title className="py-2" style={{ fontSize: "2.5rem" }}>
                  {name}
                </Card.Title>
                <Card.Text
                  className="py-2"
                  style={{ fontSize: "1rem", textAlign: "justify" }}
                >
                  {description}
                </Card.Text>
              </Card.Body>
              <ListGroup>
                <ListGroup.Item style={{ fontSize: "1.5rem", border: "none" }}>
                  Price: ₱{price}
                </ListGroup.Item>
                <ListGroup.Item style={{ border: "none" }}>
                  <Form.Label>Quantity:</Form.Label>
                  <Form.Control
                    type="text"
                    pattern="[0-9]*"
                    placeholder="Enter Quantity"
                    required
                    minLength={1}
                    value={quantity}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (
                        !value.includes("-") &&
                        !value.includes("--") &&
                        !value.includes("e") &&
                        value >= 1
                      ) {
                        setQuantity(parseInt(value, 10));
                      } else {
                        setQuantity("");
                      }
                    }}
                  />
                </ListGroup.Item>
              </ListGroup>
              <Row>
                <Col>
                  <Card.Body
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    {user.id !== null ? (
                      <Button
                        type="submit"
                        id="submitBtn"
                        className="mx-2 btn-lg w-100 border-0"
                        style={{ backgroundColor: "#3B638C" }}
                        onClick={() => {
                          order(productId);
                          addToCart();
                        }}
                      >
                        Add to Cart
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        id="submitBtn"
                        className="mx-2 btn-lg w-100 border-0"
                        style={{ backgroundColor: "#3B638C" }}
                        as={Link}
                        to="/login"
                      >
                        Add to Cart
                      </Button>
                    )}
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}
