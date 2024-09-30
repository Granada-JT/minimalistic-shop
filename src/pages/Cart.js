import { Button, Container, Table } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import "../App.css";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState("");
  const intervalRef = useRef(null);

  const fetchCart = () => {
    fetch(`${process.env.REACT_APP_API_URL}/cart/getCart`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      cache: "no-store",
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

    // Set up polling interval
    intervalRef.current = setInterval(fetchCart, 5000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const handleCheckout = async (cartItemId) => {
    try {
      const { value: paymentMethod } = await Swal.fire({
        title: "Select Payment Method",
        input: "select",
        inputOptions: {
          COD: "Cash on Delivery",
          debitCard: "Debit Card",
        },
        inputPlaceholder: "Select payment method",
        showCancelButton: true,
      });

      if (paymentMethod) {
        const createCheckoutResponse = await fetch(
          `${process.env.REACT_APP_API_URL}/checkout/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              cartItemId,
              paymentMethod,
            }),
          },
        );

        const createCheckoutData = await createCheckoutResponse.json();

        if (createCheckoutData === true) {
          const getCheckoutResponse = await fetch(
            `${process.env.REACT_APP_API_URL}/users/getCheckout`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            },
          );

          const getCheckoutData = await getCheckoutResponse.json();

          if (getCheckoutData) {
            Swal.fire(
              "Checkout Successful",
              "Please wait for your item's delivery",
              "success",
            );
            fetchCart(); // Refresh cart data after successful checkout
          } else {
            Swal.fire("Failed to Checkout", "", "error");
          }
        } else {
          Swal.fire("Failed to Checkout", "", "error");
        }
      }
    } catch (error) {
      Swal.fire("Failed to Checkout", "", "error");
    }
  };

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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => {
              return (
                <tr key={item.productId}>
                  <td>{item.productId.name}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.subTotal}</td>
                  <td>
                    <Button
                      id="checkoutButton"
                      onClick={() => handleCheckout(item._id)}
                    >
                      Checkout
                    </Button>
                  </td>
                </tr>
              );
            })}
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
