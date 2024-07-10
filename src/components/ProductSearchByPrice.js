import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';

const ProductsSearchByPrice = () => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/products/search-by-price`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, 
        },
        body: JSON.stringify({
          minPrice: minPrice,
          maxPrice: maxPrice,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error searching products:', error);
      setError('Error fetching products. Please try again later.');
    }
  };

  return (
    <Container>
      <h2>Search Products by Price Range</h2>
      <Form onSubmit={handleSearch}>
        <Row>
          <Col>
            <Form.Group controlId="minPrice">
              <Form.Label>Minimum Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter minimum price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="maxPrice">
              <Form.Label>Maximum Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter maximum price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>

      <hr />

      {error && <p className="text-danger">{error}</p>}

      <h3>Search Results</h3>
      <ListGroup>
        {products.map((product) => (
          <ListGroup.Item key={product.id}>
            <strong>{product.name}</strong> - ${product.price}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default ProductsSearchByPrice;
