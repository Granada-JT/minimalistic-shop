import { BrowserRouter as Router } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import {UserProvider } from'./UserContext';
import { useState, useEffect } from 'react';
import AppNavbar from './components/AppNavbar';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import Products from './pages/Products';
import ProductView from './pages/ProductView';

function App() {

  // This state hook is for the user state that's defined here for a global.
  const [user, setUser] = useState({ 
    id: null,
    isAdmin: null
  });

  // Function for clearing the localStorage to logout the user.
  const unsetUser = () => {
    localStorage.clear();
  }

  useEffect(() => {

    fetch(`${process.env.REACT_APP_API_URL}/users/userDetails`, {
      headers: {
        Authorization: `Bearer ${ localStorage.getItem('token') }`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      // Set the user states values with the user details upon successful login.
      if (typeof data._id !== "undefined") {

        setUser({
          id: data._id,
          isAdmin: data.isAdmin
        });

      // Else set the user states to the initial values
      } else {

        setUser({
          id: null,
          isAdmin: null
        });

      }

    })

    }, []);

  // Used to check if the user information is properly stored upon login and the localStorage information is cleared out upon logout.
  useEffect(() => {
    console.log(user);
    console.log(localStorage);
  }, [user])
  
  return (
    
    <UserProvider value={{user, setUser, unsetUser}}>
      <Router>
        <Container fluid>
          <AppNavbar />
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/products/" element={<Products/>} />
            <Route path="/products/:courseId" element={<ProductView/>} />
            {/* <Route path="/profile" element={<Profile/>} /> */}
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/logout" element={<Logout/>} />
            {/* <Route path="/*" element={<Error/>} />             */}
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
