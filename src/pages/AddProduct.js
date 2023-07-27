import { useState, useContext, useEffect } from 'react';
import { Col, Container, Form, Button, Row, Table } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function AddProduct(){

  const navigate = useNavigate();
  const {user} = useContext(UserContext);
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    fetch(`${process.env.REACT_APP_API_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProductsData(data);
      })
      .catch((error) => console.log(error));
  }

  const [name,setName] = useState("");
  const [description,setDescription] = useState("");
  const [price,setPrice] = useState("");
  const [imgSrc,setImgSrc] = useState("");

  function createProduct(e){

    //prevent submit event's default behavior
    e.preventDefault();

    let token = localStorage.getItem('token');

    fetch(`${process.env.REACT_APP_API_URL}/products/`,{

      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({

        name: name,
        description: description,
        price: price,
        imgSrc: imgSrc

      })
    })
    .then(res => res.json())
    .then(data => {

      if(data){
        Swal.fire({
            icon: 'success',
            title: 'Product successfully created',
          });
          navigate('/products');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Unsuccessful Product Creation',
            text: 'A product with the same name and description already exists. Please try again.',
          });
        }

    })

        setName("")
        setDescription("")
        setPrice(0)
        setImgSrc("");
  }

  return (
    <>
      {user.isAdmin === true ? (
        <Container>
          <Row id="addProductRow">
            <Col>
              <h2 className="my-5 text-center">Product List</h2>
              <div style={{ height: "50vh", overflow: "auto", scrollbarWidth: "none", borderRadius: "15px" }}>
                <style>
                  {`
                  div::-webkit-scrollbar {
                    display: none;
                  }

                  #custom-table2Heading{
                    vertical-align: top;
                  }
                  `}
                </style>
                <Table id="custom-table2" striped bordered responsive>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productsData.map((product) => (
                      <tr key={product._id}>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{product.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Col>
            <Col>
              <h2 className="my-5 text-center">Add Product</h2>
              <Form onSubmit={e => createProduct(e)}>
                <Form.Group>
                  <Form.Label className="my-2">Name:</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter Name" 
                    required 
                    value={name} 
                    onChange={e => {setName(e.target.value)}}/>
                </Form.Group>
                <Form.Group>
                  <Form.Label className="my-2">Description:</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    placeholder="Enter Description" 
                    required 
                    value={description} 
                    onChange={e => {setDescription(e.target.value)}}/>
                </Form.Group>
                <Form.Group>
                  <Form.Label className="my-2">Price:</Form.Label>
                  <Form.Control 
                    type="number" 
                    placeholder="Enter Price" 
                    required 
                    value={price} 
                    onChange={e => {setPrice(e.target.value)}}/>
                </Form.Group>
                <Form.Group>
                  <Form.Label className="my-2">Image Source:</Form.Label>
                  <Form.Control 
                    type="string" 
                    placeholder="Enter Product Image Source" 
                    required 
                    value={imgSrc} 
                    onChange={e => {setImgSrc(e.target.value)}}/>
                </Form.Group>
                <Button style={{ backgroundColor: "#CC3939", border: "none"}} type="submit" className="my-5">Create Product</Button>
              </Form>
            </Col>
          </Row>
        </Container>
        ) : (
          <Container>
            <Navigate to="/products"/>
          </Container>
        )
      }
    </>
  );
}  