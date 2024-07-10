import React, { useEffect, useState } from 'react';
import { Row, Col, Carousel, Form, Button } from 'react-bootstrap';
import ProductCard from './ProductCard';
import carouselOne from '../images/carousel1.png';
import carouselTwo from '../images/carousel2.png';

export default function UserView({ productsData }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    if (productsData) {
      const activeProducts = productsData.filter(product => product.isActive);

      const productElements = activeProducts.map(product => (
        <Col key={product._id} xs={12} md={4} className="mb-4">
          <ProductCard productProp={product} />
        </Col>
      ));

      setProducts(productElements);
      setFilteredProducts(activeProducts);
    } else {
      setProducts([]);
      setFilteredProducts([]);
    }
  }, [productsData]);

  const handleSearch = () => {
    let results = filteredProducts;

    if (searchName.trim() !== '') {
      results = results.filter(product =>
        product.name.toLowerCase().includes(searchName.trim().toLowerCase())
      );
    }

    if (minPrice !== '' && maxPrice !== '') {
      results = results.filter(product =>
        product.price >= parseFloat(minPrice) && product.price <= parseFloat(maxPrice)
      );
    } else if (minPrice !== '') {
      results = results.filter(product => product.price >= parseFloat(minPrice));
    } else if (maxPrice !== '') {
      results = results.filter(product => product.price <= parseFloat(maxPrice));
    }

    setProducts(results.map(product => (
      <Col key={product._id} xs={12} md={4} className="mb-4">
        <ProductCard productProp={product} />
      </Col>
    )));

    if (results.length === 0) {
      setProducts([]);
    }
  };

  const handleReset = () => {
    const productElements = filteredProducts.map(product => (
      <Col key={product._id} xs={12} md={4} className="mb-4">
        <ProductCard productProp={product} />
      </Col>
    ));
    setProducts(productElements);
    setSearchName('');
    setMinPrice('');
    setMaxPrice('');
  };

  const handleNameChange = (event) => {
    setSearchName(event.target.value);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  return (
    <div className="container">
      <Row>
        <Col md={12}>
          <h1 className="text-center mt-3">Explore Our Products</h1>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Carousel className="mt-4">
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={carouselOne}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={carouselTwo}
                alt="Second slide"
              />
              <Carousel.Caption>
                <h3>Power your possibilities with precision. Explore our elite selection of laptops tailored for every ambition!</h3>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>

      {/* Search Products Section */}
      <Row className="mt-4">
        <Col xs={12}>
          <div className="mt-4 d-flex justify-content-center">
            <h2>Search Products</h2>
          </div>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col xs={12} md={2} className="d-flex justify-content-center">
          <Form>
            <Form.Group controlId="productName" className="mb-2">
              <Form.Label className="sr-only"><strong>Search by Name</strong></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={searchName}
                onChange={handleNameChange}
              />
            </Form.Group>
          </Form>
        </Col>
        <Col xs={12} md={2} className="d-flex justify-content-center">
          <Form>
            <Form.Group controlId="minPrice" className="mb-2">
              <Form.Label className="sr-only"><strong>Minimum Price</strong></Form.Label>
              <Form.Control
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={handleMinPriceChange}
              />
            </Form.Group>
          </Form>
        </Col>
        <Col xs={12} md={2} className="d-flex justify-content-center">
          <Form>
            <Form.Group controlId="maxPrice" className="mb-2">
              <Form.Label className="sr-only"><strong>Maximum Price</strong></Form.Label>
              <Form.Control
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={handleMaxPriceChange}
              />
            </Form.Group>
          </Form>
        </Col>
        <Col xs={12} md={2} className="d-flex justify-content-center align-items-center mt-2">
          <Button variant="primary" className="mr-2" onClick={handleSearch}>
            Search
          </Button>
          <Button variant="secondary" className='ml-2' onClick={handleReset}>
            Reset
          </Button>
        </Col>
      </Row>

      {/* Products Section */}
      <Row className="mt-4">
        <Col xs={12}>
          <Row>
            {products.length > 0 ? (
              products
            ) : (
              <Col xs={12} className="text-center mt-4">No products found.</Col>
            )}
          </Row>
        </Col>
      </Row>
    </div>
  );
}
