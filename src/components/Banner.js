import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Banner({ data }) {
  const { title, content, destination, label, backgroundImage } = data;

  const bannerStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(231, 230, 230, 0.5), rgba(231, 230, 230, 0.5)), url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "top",
    borderRadius: "15px",
    padding: "30px",
    margin: "auto",
    maxWidth: "auto",
    minHeight: "79vh",
  };

  return (
    <Container className="mt-4" style={bannerStyle}>
      <Row>
        <Col className="col-lg-4" style={{ paddingTop: "100px" }}>
          <h1 className="my-4">{title}</h1>
          <p className="my-4">{content}</p>
          <Link className="btn btn-primary mt-4" to={destination}>
            {label}
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
