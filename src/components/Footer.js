import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-light p-5">
      <Container fluid>
        <Row className="mb-4">
          <Col md={3}>
            <div className="mb-4">
              <h2>TechPro</h2>
            </div>
            <div>
              <h5>Register for Free</h5>
              <Link to="/register"><Button variant="primary" className="mt-2">Sign Up</Button></Link>
            </div>
          </Col>
          <Col md={3}>
            <h5>Menu</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-light text-decoration-none">Home</Link></li>
              <li><Link to="/products" className="text-light text-decoration-none">Products</Link></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Contact</h5>
            <ul className="list-unstyled">
              <li><FaEnvelope /> <a href="mailto:info@example.com" className="text-light text-decoration-none">info@example.com</a></li>
              <li><FaPhone /> New York, NY 10012, US</li>
              <li><FaPhone /> +01 23456788</li>
            </ul>
          </Col>
          <Col md={3}>
            <div className="mb-4">
              <h5>Get connected with us on our social networks:</h5>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook className="me-3 text-light" /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter className="me-3 text-light" /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin className="me-3 text-light" /></a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer"><FaGithub className="me-3 text-light" /></a>
            </div>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={{ span: 6, offset: 3 }} className="text-center">
            <p className="text-light">© 2024 TechPro. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
