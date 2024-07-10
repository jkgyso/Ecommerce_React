import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import UserContext from '../UserContext';

export default function AppNavbar() {
  const { user } = useContext(UserContext);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    if (user.id) {
      fetchCartItemCount();
    }
  }, [user]);

  const fetchCartItemCount = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/get-cart`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.cartItems) {
          setCartItemCount(data.cartItems.length);
        } else {
          setCartItemCount(0);
        }
      })
      .catch(() => {
        setCartItemCount(0);
      });
  };

  return (
    <Navbar expand="lg" bg="light">
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/">TechPro</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" exact="true">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/products" exact="true">Products</Nav.Link>
            {user.id !== null ? (
              <>
                {user.isAdmin ? (
                  <Nav.Link as={NavLink} to="/addProduct">Add Product</Nav.Link>
                ) : (
                  <Nav.Link as={NavLink} to="/cart">
                    Cart <FaShoppingCart />
                    {cartItemCount > 0 && (
                      <Badge bg="secondary" className="ms-1">{cartItemCount}</Badge>
                    )}
                  </Nav.Link>
                )}
                <Nav.Link as={NavLink} to="/logout" exact="true">Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login" exact="true">Login</Nav.Link>
                <Nav.Link as={NavLink} to="/register" exact="true">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
