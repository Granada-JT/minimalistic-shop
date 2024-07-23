import { Container, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import ArchiveProduct from "./ArchiveProduct";
import EditProduct from "./EditProduct";
import "../App.css";

export default function AdminView({ productsData, fetchData }) {
  // State to store all products
  const [products, setProducts] = useState([]);

  //Getting the productsData from the products page
  useEffect(() => {
    const productsArr = productsData.map((product) => {
      return (
        <tr key={product._id}>
          <td>{product._id}</td>
          <td>{product.name}</td>
          <td>{product.description}</td>
          <td>{product.price}</td>
          <td className={product.isActive ? "text-success" : "text-danger"}>
            {product.isActive ? "Available" : "Unavailable"}
          </td>
          <td>
            <EditProduct product={product._id} fetchData={fetchData} />
          </td>
          <td>
            <ArchiveProduct
              product={product._id}
              isActive={product.isActive}
              fetchData={fetchData}
            />
          </td>
        </tr>
      );
    });

    setProducts(productsArr);
  }, [productsData]);

  return (
    <>
      <Container>
        <Table id="custom-table" striped bordered hover responsive>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Availability</th>
              <th colSpan="2" id="buttonCell">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>{products}</tbody>
        </Table>
      </Container>
    </>
  );
}
