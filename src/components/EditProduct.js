import { Button, Form, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { useState } from "react";
import "../App.css";

// This component represents the edit product modal
export default function EditProduct({ product, fetchData }) {
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [showEdit, setShowEdit] = useState(false);

  // Function for opening the modal
  const openEdit = (productId) => {
    fetch(`http://localhost:4000/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProductId(data._id);
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setImgSrc(data.imgSrc);
      });

    setShowEdit(true);
  };

  const closeEdit = () => {
    setShowEdit(false);
    setName("");
    setDescription("");
    setPrice("");
    setImgSrc("");
  };

  // Function to update the product
  const editProduct = (e, productId) => {
    e.preventDefault();

    fetch(`http://localhost:4000/products/${productId}/updateProduct`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: name,
        description: description,
        price: price,
        imgSrc: imgSrc,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          Swal.fire({
            title: "Success!",
            icon: "success",
            text: "Product successfully updated.",
          });
          closeEdit();
          fetchData();
        } else {
          Swal.fire({
            title: "Error!",
            icon: "error",
            text: "A product with the same name and description already exists. Please try a different name and description.",
          });
          closeEdit();
          fetchData();
        }
      });
  };

  return (
    <>
      <Button
        variant="primary"
        id="editButton"
        size="sm"
        onClick={() => openEdit(product)}
      >
        Edit
      </Button>

      <Modal show={showEdit} onHide={closeEdit}>
        <Form onSubmit={(e) => editProduct(e, productId)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit product</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group controlId="productName">
              <Form.Label className="my-2">Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group controlId="productDescription">
              <Form.Label className="my-2">Description</Form.Label>
              <Form.Control
                type="text"
                required
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group controlId="productPrice">
              <Form.Label className="my-2">Price</Form.Label>
              <Form.Control
                type="number"
                required
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group controlId="productPrice">
              <Form.Label className="my-2">Image Source</Form.Label>
              <Form.Control
                type="string"
                required
                value={imgSrc}
                onChange={(e) => {
                  setImgSrc(e.target.value);
                }}
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={closeEdit}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
