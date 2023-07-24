import React, { useEffect, useState } from 'react';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     fetchCartItems();
//   }, []);


  const addToCart = () => {
    fetch(`${process.env.REACT_APP_API_URL}/addToCart`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getUserToken()}`,
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data) => {
      setCartItems(data.cartItems);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const changeQuantity = (productId, quantity) => {
    fetch(`${process.env.REACT_APP_API_URL}/changeQuantity`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getUserToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId, quantity }),
    })
    .then((response) => response.json())
    .then((data) => {
      setCartItems(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const removeItemFromCart = (productId) => {
    fetch(`${process.env.REACT_APP_API_URL}/removeItem`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getUserToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    })
    .then((response) => response.json())
    .then((data) => {
      setCartItems(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getUserToken = () => {
    // Implement your logic to get the user token
    // For example, you can use localStorage or a state management library like Redux
    return 'user_token';
  };

  return (
    <div>
      <h1>Cart</h1>
  
      {cartItems.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        <ul>
          {cartItems.map((cartItem) => (
            <li key={cartItem.productId}>
              <p>{cartItem.productName}</p>
              <p>Quantity: {cartItem.quantity}</p>
              <p>Price: ${cartItem.price}</p>
              <p>Subtotal: ${cartItem.subTotal}</p>
              <button onClick={() => changeQuantity(cartItem.productId, cartItem.quantity - 1)}>
                Decrease Quantity
              </button>
              <button onClick={() => changeQuantity(cartItem.productId, cartItem.quantity + 1)}>
                Increase Quantity
              </button>
              <button onClick={() => removeItemFromCart(cartItem.productId)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
  
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  )
}
