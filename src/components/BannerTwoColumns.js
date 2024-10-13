import { Col, Container, Row } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

export default function Banner({ data }) {
  const { backgroundImage, leftImage, forms, isLoading } = data;

  const bannerStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(231, 230, 230, 0.5), rgba(231, 230, 230, 0.5)), url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "top",
    borderRadius: "15px",
    padding: "30px",
    width: "100%",
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
            src={leftImage}
            alt="BackgroundImage"
            style={{ width: "100%" }}
          />
        </Col>
        <Col
          lg={6}
          md={12}
          className="
            d-flex
            justify-content-center
            align-items-center
          "
        >
          {isLoading ? (
            <Row
              className="d-flex justify-content-center align-items-center h-100"
              style={{
                height: "100%",
                borderRadius: "15px",
                width: "100%",
                fontSize: "25px",
                backgroundColor: "rgba(231, 230, 230, 0.2)",
                backdropFilter: "blur(3px)",
              }}
            >
              Logging In
              <Spinner
                animation="border"
                style={{
                  height: "40px",
                  width: "40px",
                  margin: "10px 0 0 10px",
                  fontSize: "16px",
                }}
              />
            </Row>
          ) : (
            { ...forms }
          )}
        </Col>
      </Row>
    </Container>
  );
}
