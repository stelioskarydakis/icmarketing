import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-top border-primary bg-light py-3">
      <Container>
        <Row className="d-flex justify-content-between align-items-center">
          <Col>
            <Link
              to="https://github.com/stelioskarydakis/icmarketing"
              className="link-dark"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="github.svg" className="img-thumbnail" alt="github" />
            </Link>
          </Col>
          <Col className="text-center">&copy; ICMarketing</Col>
          <Col className="text-end">
            <Link to="/terms" className="link-dark">
              {t("terms.titleSmall")}
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;
