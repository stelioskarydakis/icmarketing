import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MetaData from "../components/MetaData";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <>
      <MetaData metaTitle={t("404.title")} />

      <section className="min-vh-100">
        <Container className="mt-5">
          <Row className="justify-content-center">
            <Col lg={6} md={8}>
              <div className="text-center">
                <h1 className="display-4">404</h1>
                <p className="lead">{t("404.description")}</p>
                <p>{t("404.notFound")}</p>
                <Link to="/" className="btn btn-primary">
                  {t("404.goBack")}
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default NotFound;
