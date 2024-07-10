import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Table, Button, Alert, ButtonGroup } from 'react-bootstrap';
import { FaTrashAlt } from 'react-icons/fa';
import CheckoutModal from '../components/CheckoutModal';

function formatCurrency(value) {
  return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(value);
}

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/get-cart`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          setError(data.message);
        } else {
          const fetchProductDetails = data.cartItems.map(item => {
            return fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${item.productId}`, {
              headers: {
                'Content-Type': 'application/json',
              }
            })
              .then(res => res.json())
              .then(productData => {
                if (productData.product) {
                  return { ...item, name: productData.product.name, price: productData.product.price };
                } else {
                  setError('Product not found');
                  return item; // return item without product details in case of error
                }
              });
          });

          Promise.all(fetchProductDetails).then(itemsWithDetails => {
            setCartItems(itemsWithDetails);
            setTotalPrice(data.totalPrice || 0);
          });
        }
      })
      .catch(() => {
        setError('Failed to fetch cart items');
      });
  };

  const handleRemoveFromCart = (itemId) => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/${itemId}/remove-from-cart`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({})
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'Item removed from cart successfully') {
          fetchCartItems(); // Refresh the cart items after removal
          setSuccess('Item removed from cart successfully');
          setError('');
        } else {
          setError(data.message);
          setSuccess('');
        }
      })
      .catch(() => {
        setError('Failed to remove item from cart');
        setSuccess('');
      });
  };

  const handleQuantityUpdate = (item, newQuantity) => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/update-cart-quantity`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ 
        productId: item.productId,
        quantity: newQuantity,
        subtotal: item.price * newQuantity
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'Cart updated successfully') {
          fetchCartItems(); // Refresh the cart items after updating quantity
          // setSuccess('Cart updated successfully');
          // setError('');
        } else {
          setError(data.message);
          setSuccess('');
        }
      })
      .catch(() => {
        setError('Failed to update item quantity');
        setSuccess('');
      });
  };

  const handleOrder = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'Order placed successfully') {
          setSuccess('Order placed successfully');
          setError('');
          setShowCheckoutModal(false);
          setCartItems([]);
          setTotalPrice(0);
        } else {
          setError(data.message);
          setSuccess('');
        }
      })
      .catch(() => {
        setError('Failed to place order');
        setSuccess('');
      });
  };

  const handleCheckout = () => {
    setShowCheckoutModal(true);
  };

  const handleClearCart = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/clear-cart`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'Cart cleared successfully') {
          setCartItems([]);
          setTotalPrice(0);
          setSuccess('Cart cleared successfully');
          setError('');
        } else {
          setError(data.message);
          setSuccess('');
        }
      })
      .catch(() => {
        setError('Failed to clear cart');
        setSuccess('');
      });
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Shopping Cart</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert key="success" variant="success">{success}</Alert>}
      {cartItems.length > 0 ? (
        <>
          <Row className='mb-2'>
            <Col className="d-flex justify-content-end gap-3">
              <Button variant="info" onClick={() => navigate('/products')}>
                Add More
              </Button>
              <Button variant="danger" onClick={handleClearCart}>
                Clear Cart
              </Button>
            </Col>
          </Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{formatCurrency(item.price)}</td>
                  <td>
                    <ButtonGroup>
                      <Button variant="secondary" onClick={() => handleQuantityUpdate(item, item.quantity - 1)} disabled={item.quantity <= 1}>-</Button>
                      <Button variant="light" disabled>{item.quantity}</Button>
                      <Button variant="secondary" onClick={() => handleQuantityUpdate(item, item.quantity + 1)}>+</Button>
                    </ButtonGroup>
                  </td>
                  <td>{formatCurrency(item.price * item.quantity)}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleRemoveFromCart(item.productId)}>
                      <FaTrashAlt />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Row className="mt-4 justify-content-end align-items-center">
            <Col md="4" className="me-2">
              <Button variant="dark" className="w-100">
                Total: {formatCurrency(totalPrice)}
              </Button>
            </Col>
            <Col md="2">
              <Button variant="success" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
            </Col>
        </Row>
        </>
      ) : (
        <h4>Your cart is empty.</h4>
      )}
      <CheckoutModal
        show={showCheckoutModal}
        handleClose={() => setShowCheckoutModal(false)}
        totalPrice={totalPrice}
        handleOrder={handleOrder}
      />
    </Container>
  );
}
