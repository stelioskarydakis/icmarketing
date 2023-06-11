import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RegisterForm from "../components/RegisterForm";
import { useTranslation } from "react-i18next";
import MetaData from "../components/MetaData";

const Register = () => {
  const { t } = useTranslation();

  return (
    <>
      <MetaData metaTitle={t("navbar.register")} />

      <section className="min-vh-100 my-[50px]">
        <Container>
          <Row>
            <Col className="text-center mb-3">
              <h1>{t("navbar.register")}</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <RegisterForm />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
export default Register;
