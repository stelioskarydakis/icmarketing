import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useTranslation } from "react-i18next";
import ProfileData from "../components/ProfileData";
import { Link } from "react-router-dom";
import MetaData from "../components/MetaData";

const Profile = () => {
  const { t } = useTranslation();

  return (
    <>
      <MetaData metaTitle={t("navbar.profile")} />

      <section className="min-vh-100">
        <Container>
          <Row>
            <Col className="text-center">
              <h1>{t("navbar.profile")}</h1>
            </Col>
          </Row>
          <ProfileData />
          <Row>
            <Col className="text-center">
              <Link to="/register">{t("profile.updateData")}</Link>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
export default Profile;
