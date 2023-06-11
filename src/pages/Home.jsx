import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useTranslation } from "react-i18next";
import {
  PremiumButton,
  BasicProductGrid,
  PremiumProductGrid,
} from "../components";
import { useSelector } from "react-redux";

const Home = () => {
  const { t } = useTranslation();
  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);

  return (
    <section className="min-vh-100 my-[50px]">
      <Container>
        <Row>
          <Col className="text-center mb-3">
            <h1>{t("home.title")}</h1>
            <p>{t("home.description")}</p>
          </Col>
        </Row>
        <Row>
          <Col>{!isLoggedIn && <PremiumButton />}</Col>
        </Row>
        <Row>
          <Col>{isLoggedIn && <PremiumProductGrid />}</Col>
        </Row>
        <Row>
          <Col>
            <BasicProductGrid />
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default Home;
