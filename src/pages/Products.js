import { useContext, useEffect, useState } from "react";
import AdminView from "../components/AdminView";
import UserContext from "../UserContext";
import UserView from "../components/UserView";

export default function Products() {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      fetch(`${process.env.REACT_APP_API_URL}/products/all`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          setIsLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {user.isAdmin === true ? (
        <AdminView productsData={products} fetchData={fetchData} />
      ) : (
        <UserView productsData={products} isLoading={isLoading} />
      )}
    </>
  );
}
