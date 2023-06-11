import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoginForm from "../components/LoginForm";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();

  return (
    <section className="min-vh-100 my-[50px]">
      <Container>
        <Row>
          <Col className="text-center mb-3">
            <h1>{t("navbar.signIn")}</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <LoginForm />
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default Login;
