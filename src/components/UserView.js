import { Container, Col, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import '../App.css';
// import ProductSearch from './CourseSearch';
// import ProductSearchByPrice from './CourseSearchByPrice';



export default function UserView({productsData}) {

  const [products, setProducts] = useState([])

  useEffect(() => {
    const productsArr = productsData.map(product => {

      //only render the active products since the route used is /all from product.js page
      if(product.isActive === true) {
        return (
          <ProductCard productProp={product} key={product._id}/>
        )
      } else {
        return null;
      }
    })

    //set the products state to the result of our map function, to bring our returned product component outside of the scope of our useEffect where our return statement below can see.
    setProducts(productsArr)

  }, [productsData])

  return(
    <>
{/*       <ProductSearch />
      <ProductSearchByPrice /> */}
        <Container>
        <Row id="userViewRow">
          {products.map((product, index) => (
            <Col key={index} sm={12} md={6} lg={4} xl={3}>
              {product}
            </Col>
          ))}
        </Row>
      </Container>

    </>
  )
}