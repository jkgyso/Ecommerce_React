import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import lenovoImage from '../images/lenovo.jpg';
import acerImage from '../images/acer2.png';
import asusImage from '../images/asus2.jpg';

const Highlights = () => {
    return (
        <>
            <div className="text-center mb-5 mt-5 p-1">
                <h1>Top Sellers</h1>
                <p>Browse our top-selling products:</p>
            </div>
            <Row className="mt-3 mb-3">
                <Col xs={12} md={4}>
                    <Card className="cardHighlight p-3 h-100" style={{ width: '18rem' }}>
                        <Card.Img variant='top' src={lenovoImage} />
                        <Card.Body className="d-flex flex-column align-items-center">
                            <Card.Title>
                                <h2>Lenovo Legion</h2>
                            </Card.Title>
                            <Card.Text className="text-center mb-4">
                                Lenovo Legion is a brand under Lenovo dedicated to gaming products, focusing primarily on laptops and desktops. Launched to cater to the growing demand for powerful gaming systems, the Legion series combines robust hardware specifications with sleek designs and gamer-centric features.
                            </Card.Text>
                            <Link to="/products" className="btn btn-primary mt-auto">Shop Now</Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={4}>
                    <Card className="cardHighlight p-3 h-100" style={{ width: '18rem' }}>
                        <Card.Img variant='top' src={acerImage} />
                        <Card.Body className="d-flex flex-column align-items-center">
                            <Card.Title>
                                <h2>Acer Predator</h2>
                            </Card.Title>
                            <Card.Text className="text-center mb-4">
                                The Acer Predator series is a lineup of high-performance gaming laptops and desktops designed for enthusiasts and professional gamers. Known for its robust hardware specifications and gaming-centric features, Acer Predator devices are tailored to deliver exceptional gaming experiences.
                            </Card.Text>
                            <Link to="/products" className="btn btn-primary mt-auto">Shop Now</Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={4}>
                    <Card className="cardHighlight p-3 h-100" style={{ width: '18rem' }}>
                        <Card.Img variant='top' src={asusImage} />
                        <Card.Body className="d-flex flex-column align-items-center">
                            <Card.Title>
                                <h2>Asus ROG</h2>
                            </Card.Title>
                            <Card.Text className="text-center mb-4">
                                ASUS ROG (Republic of Gamers) is renowned for pushing the boundaries of gaming hardware innovation. It combines cutting-edge technology with sleek designs and robust build quality to deliver exceptional gaming experiences.
                            </Card.Text>
                            <Link to="/products" className="btn btn-primary mt-auto">Shop Now</Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default Highlights;
