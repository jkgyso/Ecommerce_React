import { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col, Form } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function ProductView() {

  const { productId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage ] = useState("")
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setQuantity(value);
    }
  };

  const addToCart = (productId) => {

    const subtotal = price * quantity;

    fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/add-to-cart`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        productId,
        quantity,
        subtotal                   
      })  
    })
    .then(res => res.json())
    .then(data => {
      if (data.message === 'Admin is forbidden') {
        Swal.fire({
          title: 'Admin enrollment error',
          icon: 'error',
          text: 'You are an administrator, you may not enroll to a product'
        });
      } else if (data.message === 'Item added to cart') {
        Swal.fire({
          title: 'Successfully Added',
          icon: 'success',
          text: 'You have successfully added this product'
        });

        setQuantity(0);
        navigate("/cart");

      } else {
        Swal.fire({
          title: 'Something went wrong',
          icon: 'error',
          text: 'Please try again'
        });
      }
    })
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`)
      .then(res => res.json())
      .then(data => {

        if (data.product) {
          setName(data.product.name);
          setDescription(data.product.description);
          setPrice(data.product.price);
          setImage(data.product.image);
        } else {
          setError('Product not found');
        }
      })

  }, [productId]);

  // Function to format the price into PHP currency with comma
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(price);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col lg={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body className="text-center">
              {error ? (
                <p>{error}</p>
              ) : (
                <>
                  <Card.Img variant="top" src={image} alt={name}
                      style={{ 
                        width: '100%', 
                        height: '200px', 
                        objectFit: 'cover'                        
                      }}
                  />
                  <Card.Title>{name}</Card.Title>
                  <Card.Subtitle>Description:</Card.Subtitle>
                  <Card.Text>{description}</Card.Text>
                  <Card.Subtitle>Price:</Card.Subtitle>
                  <Card.Text>{formatPrice(price)}</Card.Text>
                  <Form.Group>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="number" placeholder="Quantity" value={quantity} onChange={handleQuantityChange} required />                  
                  </Form.Group>

                  {user.id ? (
                    <Button variant="primary" block onClick={() => addToCart(productId)}>Add To Cart</Button>                  
                  )
                  : (
                    <Link className='btn btn-danger' to="/login">Login</Link>
                  )}
                </>
              )}
            </Card.Body>        
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
