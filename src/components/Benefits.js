import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FreeShippingImage from '../images/free-shipping.png';
import Support24Image from '../images/support-24.png'; 
import Return30Image from '../images/return-30.png'; 
import SecurePaymentImage from '../images/secure-payment.png';

const Benefits = () => {
  return (
    <Container className="mt-5 mb-5 p-5">
      <Row>
        <Col xs={12} sm={6} md={3} className="mb-3">
          <div className="d-flex align-items-start">
            <img src={FreeShippingImage} alt="Free Shipping" style={{ maxWidth: '50px', marginRight: '10px' }} />
            <div>
              <h5><strong>Free Shipping</strong></h5>
              <p>Enjoy free shipping on all orders!</p>
            </div>
          </div>
        </Col>
        <Col xs={12} sm={6} md={3} className="mb-3">
          <div className="d-flex align-items-start">
            <img src={Support24Image} alt="Support 24/7" style={{ maxWidth: '50px', marginRight: '10px' }} />
            <div>
              <h5><strong>Support 24/7</strong></h5>
              <p>Our support team is there to help you for queries</p>
            </div>
          </div>
        </Col>
        <Col xs={12} sm={6} md={3} className="mb-3">
          <div className="d-flex align-items-start">
            <img src={Return30Image} alt="30 Days Return" style={{ maxWidth: '50px', marginRight: '10px' }} />
            <div>
              <h5><strong>30 Days Return</strong></h5>
              <p>Simply return it within 30 days for an exchange.</p>
            </div>
          </div>
        </Col>
        <Col xs={12} sm={6} md={3} className="mb-3">
          <div className="d-flex align-items-start">
            <img src={SecurePaymentImage} alt="100% Payment Secure" style={{ maxWidth: '50px', marginRight: '10px' }} />
            <div>
              <h5><strong>100% Payment Secure</strong></h5>
              <p>Our payments are secured with 256 bit encryption.</p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Benefits;
