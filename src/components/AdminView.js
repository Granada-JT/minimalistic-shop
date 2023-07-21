import { Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
// import ArchiveProduct from './ArchiveProduct';
// import EditProduct from './EditProduct';


export default function AdminView({productsData, fetchData}) {

  // State to store all products 
  const [products, setProducts] = useState([]);

  //Getting the productsData from the products page
  useEffect(() => {
    console.log(products)
    console.log(productsData)
    const productsArr = productsData.map(product => {
      console.log(product)
      return (
        <tr key={product._id}>
          <td>{product._id}</td>
          <td>{product.name}</td>
          <td>{product.description}</td>
          <td>{product.price}</td>
          <td className={product.isActive ? "text-success" : "text-danger"}>
            {product.isActive ? "Available" : "Unavailable"}
          </td>
        {/*product id is passed as a prop*/}
          {/* <td><EditProduct product={product._id} fetchData={fetchData}/></td>  
          <td><ArchiveProduct product={product._id} isActive={product.isActive} fetchData={fetchData}/></td>   */}
        </tr>
        )
    })

    setProducts(productsArr)

  }, [productsData])

  return(
    <>
      <h1 className="text-center my-4"> Admin Dashboard</h1>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Availability</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products}
        </tbody>
      </Table>  
    </>

  )
}