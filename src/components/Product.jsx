import { Link } from "react-router-dom";
import productsData from "../data/products.json";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useTranslation } from "react-i18next";
import PremiumBadge from "./PremiumBadge";

const Product = ({ premium }) => {
  const { t } = useTranslation();

  // Filter the products based on the premium flag
  const filteredProducts = productsData.products.filter(
    (product) => product.premium === premium
  );

  return (
    <div className="py-3">
      <Row>
        {filteredProducts.map((product) => (
          <Col key={product.id} md={4} sm={6} xs={12} className="mb-4">
            <Card className="h-100 position-relative">
              <Card.Img
                variant="top"
                src={product.image}
                alt={t(`productGrid.product${product.id}_title`)}
              />
              <Card.Body>
                {premium && (
                  <PremiumBadge custom="position-absolute top-0 mt-3" />
                )}
                <Card.Title>
                  {t(`productGrid.product${product.id}_title`)}
                </Card.Title>
                <Card.Text>
                  {t(`productGrid.product${product.id}_excerpt`)}
                </Card.Text>
                <Link
                  to={`/products/${product.id}`}
                  className="btn btn-primary"
                >
                  {t("productGrid.viewDetails")}
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Product;
