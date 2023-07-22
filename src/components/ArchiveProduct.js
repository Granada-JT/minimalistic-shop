import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function ArchiveProduct({product, isActive, fetchData}) {

  const archiveToggle = (productId) => {
    fetch(`http://localhost:4000/products/${productId}/archiveProduct`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    .then(res => res.json())
    .then(data => {
      console.log(data)
      if(data === true) {
        Swal.fire({
          title: 'Success',
          icon: 'success',
          text: 'Product successfully archived.'
        })
        fetchData();

      }else {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'Failed to disable the product. Please try again.',
        })
        fetchData();
      }


    })
  }


    const activateToggle = (productId) => {
    fetch(`http://localhost:4000/products/${productId}/activateProduct`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data === true) {
        Swal.fire({
          title: 'Success',
          icon: 'success',
          text: 'Product successfully activated.',
        });
        fetchData();
      } else {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'Failed to enable the product. Please try again.',
        });
        fetchData();
      }


    })
  }
 

  return(
    <>
      {isActive ?

        <Button variant="danger" size="sm" onClick={() => archiveToggle(product)}>Archive</Button>

        :

        <Button variant="success" size="sm" onClick={() => activateToggle(product)}>Activate</Button>

      }
    </>

    )
}