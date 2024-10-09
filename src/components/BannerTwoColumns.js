import { Col, Container, Row } from "react-bootstrap";

export default function Banner({ data }) {
  const { backgroundImage, column1Image, forms } = data;

  const bannerStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(231, 230, 230, 0.5), rgba(231, 230, 230, 0.5)), url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "top",
    borderRadius: "15px",
    padding: "30px",
    margin: "auto",
    maxWidth: "auto",
    minHeight: "79vh",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <Container className="my-4" style={bannerStyle}>
      <Row>
        <Col lg={6} md={12} className="m-auto">
          <img
            src={column1Image}
            alt="BackgroundImage"
            style={{ width: "100%" }}
          />
        </Col>
        <Col lg={6} md={12}>
          {forms}
        </Col>
      </Row>
    </Container>
  );
}
