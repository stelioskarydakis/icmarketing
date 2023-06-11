import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  return (
    <section className="min-vh-100">
      <Container>
        <Row>
          <Col className="text-center">
            <h1>{t("about.title")}</h1>
            <p>{t("about.description")}</p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default About;
