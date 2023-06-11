import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const PremiumButton = () => {
  const { t } = useTranslation();

  return (
    <Row>
      <Col className="text-center mb-3">
        <h4> {t("premium.text")}</h4>
        <Button variant="dark" as={Link} to="/register">
          {t("premium.button")}
        </Button>
      </Col>
    </Row>
  );
};
export default PremiumButton;
