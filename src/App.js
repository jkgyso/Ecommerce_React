import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import { Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Register from './pages/Register';
import Home from './pages/Home';
import Product from './pages/Product';
import ProductView from './pages/ProductView';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Error from './pages/Error';
import Cart from './pages/Cart';
import AddProduct from './pages/AddProduct';
import { UserProvider } from './UserContext';


function App() {

  const [ user, setUser ] = useState({
    id: null, 
    isAdmin: null
  })

  const unsetUser = () => {
    localStorage.clear();
  }

  useEffect(() => {

    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, { 
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {

        if(typeof data.user !== "undefined") {

          setUser({
            id: data.user._id,
            isAdmin: data.user.isAdmin
          })

        } 
        else {

          setUser({
            id: null, 
            isAdmin: null
          })
        }
      })
    })
  
  return (
    <UserProvider value={{ user, setUser, unsetUser}}>
    <Router>
      <AppNavbar/>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route exact="true" path="/products/:productId" element={<ProductView />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="*" element={<Error />} /> {/* Catch-all route */}
        </Routes>
      </Container>
    </Router>
    </UserProvider>
  );
}

export default App;
