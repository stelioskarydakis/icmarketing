import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="min-vh-100">
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col lg={6} md={8}>
            <div className="text-center">
              <h1 className="display-4">404</h1>
              <p className="lead">Oops! Page not found</p>
              <p>The page you are looking for does not exist.</p>
              <Link to="/" className="btn btn-primary">
                Go back to Home
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default NotFound;
