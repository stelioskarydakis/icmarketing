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
import MetaData from "../components/MetaData";

const Home = () => {
  const { t } = useTranslation();

  //we check if the user is logged in in order to show the premium products or the block with the button to go premium
  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);

  return (
    <>
      <MetaData
        metaTitle={t("home.title")}
        metaDescription={t("home.description")}
      />

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
    </>
  );
};
export default Home;
