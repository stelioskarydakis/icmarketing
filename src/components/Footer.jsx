import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Footer = () => {
  return (
    <footer className="border-top border-primary bg-light">
      <Container>
        <Row>
          <Col className="d-flex justify-content-center py-4">
            &copy; ICMarketing
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;
