import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";
import productsData from "../data/products.json";
import { useTranslation } from "react-i18next";
import { PremiumBadge } from "../components";

const SingleProduct = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const product = productsData.products.find(
    (product) => product.id === parseInt(id)
  );

  return (
    <section className="min-vh-100 d-flex align-items-center justify-content-center">
      <Container className="my-5">
        <Row className="align-items-center">
          <Col md={6} className="mb-3 mb-md-0 text-center">
            <img
              src={product.image}
              alt={t(`productGrid.product${product.id}_title`)}
              className="img-fluid"
            />
          </Col>
          <Col md={6}>
            <div className="text-center text-md-start">
              {product.premium && <PremiumBadge custom="mb-3" />}
              <h1>{t(`productGrid.product${product.id}_title`)}</h1>
              <p> {t(`productGrid.product${product.id}_description`)}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SingleProduct;
