import { Link } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';

export default function Banner({ data }) {
  const { backgroundImage, column1Image, forms } = data;

  const bannerStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(231, 230, 230, 0.5), rgba(231, 230, 230, 0.5)), url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'top',
    borderRadius: '15px',
    padding: '30px',
    margin: 'auto',
    maxWidth: 'auto',
    minHeight: '79vh',
  };

  return (
    <Container className="my-5" style={bannerStyle}>
      <Row>
        <Col>
            <img src={column1Image} alt="BackgroundImage" style={{ width: '100%', maxHeight: '79vh' }} />
        </Col>
        <Col>
            {forms}
        </Col>
      </Row>
    </Container>
  );
}
