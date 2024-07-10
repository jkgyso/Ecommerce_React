import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function formatCurrency(value) {
  return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(value);
}

export default function CheckoutModal({ show, handleClose, totalPrice, handleOrder }) {
  const shippingFee = totalPrice * 0.05;
  const overallTotal = totalPrice + shippingFee;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Checkout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Total Price: {formatCurrency(totalPrice)}</p>
        <p>Shipping Fee (5%): {formatCurrency(shippingFee)}</p>
        <p>Overall Total: {formatCurrency(overallTotal)}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="success" onClick={handleOrder}>
          Order
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
