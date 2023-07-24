// import coursesData from '../data/coursesData';
import { useEffect, useState, useContext } from 'react';
import UserContext from '../UserContext';
import UserView from '../components/UserView';
import AdminView from '../components/AdminView';


export default function Products() {

	const { user } = useContext(UserContext);

	// State that will be used to store courses retrieved from the database.
	const [ products, setProducts ] = useState([]);


	// Create a function to fetch all courses
	const fetchData = () => {
		fetch(`${process.env.REACT_APP_API_URL}/products/all`)
		.then(res => res.json())
		.then(data =>{
			console.log(data)
			setProducts(data);
		});
	}

	// Retrieves the courses from the database upon initial render of the "Courses" component
	useEffect(() =>{

		fetchData();

	}, []);


	return(
		<>
		    {
		    	(user.isAdmin === true) 
		    		?
		    		<AdminView productsData={products} fetchData={fetchData}/>
		    		:
		    		<UserView productsData={products} />
			}
			
		</>
	)

};