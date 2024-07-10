import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ProductCard({ productProp }) {
  const { name, description, price, _id, image } = productProp;

  // Format the price as PHP currency
  const formatPrice = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(price);

  return (
    <Card style={{ border: 'none', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} className="mt-3">
      <Card.Body>
        {image && (
          <Card.Img 
            variant="top" 
            src={image} 
            alt={name}
            style={{ 
              width: '100%', 
              height: '200px', 
              objectFit: 'cover' 
            }}
          />
        )}
        <Card.Title>{name}</Card.Title>
        <Card.Text>Description: {description}</Card.Text>
        <Card.Text>Price: {formatPrice}</Card.Text>
        <Link to={`/products/${_id}`} className="btn btn-primary">Details</Link>
      </Card.Body>
    </Card>
  );
}
