import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState('');

  const fetchCart = () => {
    fetch(`${process.env.REACT_APP_API_URL}/cart/getCart`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      cache: 'no-store',
    })
      .then((response) => response.json())
      .then((data) => {
        setCart(data.cartItems);
        setTotalPrice(data.totalPrice);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    // Fetch cart data initially
    fetchCart();

    // Polling interval in milliseconds (e.g., every 5 seconds)
    const interval = setInterval(fetchCart, 5000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []); // Run only once on component mount

  return (
    <Container>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <Table id="cartTable" striped bordered hover responsive>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Sub Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.productId}>
                <td>{item.productId.name}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>{item.subTotal}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4">Total Price: {totalPrice}</td>
            </tr>
          </tfoot>
        </Table>
      )}
    </Container>
  );
};

export default CartPage;
