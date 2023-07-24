import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import "../App.css"

export default function EditProduct({product, fetchData}) {

    const [ productId, setProductId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [showEdit, setShowEdit] = useState(false);

    // function for opening the modal
    
    const openEdit = (productId) => {
        fetch(`http://localhost:4000/products/${productId}`)
          .then(res => res.json())
          .then(data => {
            setProductId(data._id);
            setName(data.name);
            setDescription(data.description);
            setPrice(data.price);
          });
      
        setShowEdit(true);
      };

    const closeEdit = () => {
        setShowEdit(false);
        setName('');
        setDescription('');
        setPrice('');
    }

    // function to update the product
    const editProduct = (e, productId) => {
        e.preventDefault();

        fetch(`http://localhost:4000/products/${productId}/updateProduct`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: name,
                description: description,
                price: price
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)

            if(data === true) {
                Swal.fire({
                    title: 'Success!',
                    icon: 'success',
                    text: 'Product successfully updated.',
                  });
                  closeEdit();
                  fetchData();
                } else {
                  Swal.fire({
                    title: 'Error!',
                    icon: 'error',
                    text: 'A product with the same name and description already exists. Please try a different name and description.',
                  });
                closeEdit();
                fetchData();
            }
        })
    }

    return(
        <>
            <Button variant="primary" id="editButton" size="sm" onClick={() => openEdit(product)}>Edit</Button>

        <Modal show={showEdit} onHide={closeEdit}>
            <Form onSubmit={e => editProduct(e, productId)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit product</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group controlId="productName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control 
                        type="text"                           
                        required
                        value={name}
                        onChange={e => {setName(e.target.value)}}
                      />
                    </Form.Group>

                    <Form.Group controlId="productDescription">
                      <Form.Label>Description</Form.Label>
                      <Form.Control 
                        type="text"                           
                        required
                        value={description}
                        onChange={e => {setDescription(e.target.value)}}
                      />
                    </Form.Group>

                    <Form.Group controlId="productPrice">
                      <Form.Label>Price</Form.Label>
                      <Form.Control 
                        type="number"                         
                        required
                        value={price}
                        onChange={e => {setPrice(e.target.value)}}
                      />
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary">Close</Button>
                    <Button variant="success" type="submit">Submit</Button>
                </Modal.Footer>
            </Form>

        </Modal>
        </>
    )
}