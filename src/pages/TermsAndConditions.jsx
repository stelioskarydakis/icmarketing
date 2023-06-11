import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useTranslation } from "react-i18next";
import MetaData from "../components/MetaData";

const TermsAndConditions = () => {
  const { t } = useTranslation();

  return (
    <>
      <MetaData metaTitle={t("terms.title")} />

      <section className="min-vh-100">
        <Container>
          <Row>
            <Col className="text-center">
              <h1>{t("terms.title")}</h1>
              <p>{t("terms.content")}</p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
export default TermsAndConditions;
