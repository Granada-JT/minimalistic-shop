import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import AddProduct from "./pages/AddProduct";
import AppNavbar from "./components/AppNavbar";
import Cart from "./pages/Cart";
import { Container } from "react-bootstrap";
import Error from "./pages/Error";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import ProductView from "./pages/ProductView";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import { UserProvider } from "./UserContext";

function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null,
  });

  const unsetUser = () => {
    localStorage.clear();
  };

  useEffect(() => {
    const gtag = document.getElementById("gtag");
    if (gtag) {
      gtag.outerHTML = `
        <script async src='https://www.googletagmanager.com/gtag/js?id=${process.env.REACT_APP_GA_M_ID}'></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.REACT_APP_GA_M_ID}');
        </script>
      `;
    }
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/userDetails`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data._id !== "undefined") {
          setUser({
            id: data._id,
            isAdmin: data.isAdmin,
          });
        } else {
          setUser({
            id: null,
            isAdmin: null,
          });
        }
      });
  }, []);

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <AppNavbar />
        <Container fluid>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/*" element={<Products />} />
            <Route path="/products/:productId" element={<ProductView />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/*" element={<Error />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
          <Footer />
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
