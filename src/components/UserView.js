import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Spinner from "react-bootstrap/Spinner";
import "../App.css";

export default function UserView({ productsData, isLoading }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productsArr = productsData.map((product) => {
      if (product.isActive === true) {
        return <ProductCard productProp={product} key={product._id} />;
      } else {
        return null;
      }
    });

    setProducts(productsArr);
  }, [productsData]);

  return (
    <Container className="my-4">
      {isLoading ? (
        <Row
          id="userViewRow"
          className="
            d-flex
            justify-content-center
            align-items-center
          "
        >
          Loading Products
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
        <Row id="userViewRow">
          {products.map((product, index) => (
            <Col
              key={index}
              sm={12}
              md={6}
              lg={4}
              xl={3}
              className="
                mt-2
                mb-2
              "
            >
              {product}
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
