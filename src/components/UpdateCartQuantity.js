import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

export default function UpdateCartQuantity({ item, onQuantityUpdate }) {
  const handleIncrease = () => {
    onQuantityUpdate(item, item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      onQuantityUpdate(item, item.quantity - 1);
    }
  };

  return (
    <ButtonGroup>
      <Button variant="danger" onClick={handleDecrease} disabled={item.quantity <= 1}>-</Button>
      <Button variant="light" disabled>{item.quantity}</Button>
      <Button variant="primary" onClick={handleIncrease}>+</Button>
    </ButtonGroup>
  );
}
