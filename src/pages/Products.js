// import coursesData from '../data/coursesData';
import { useEffect, useState, useContext } from 'react';
import UserContext from '../UserContext';
import UserView from '../components/UserView';
import AdminView from '../components/AdminView';


export default function Products() {

	const { user } = useContext(UserContext);

	// State that will be used to store courses retrieved from the database.
	const [products, setProducts] = useState([]);

	// console.log(coursesData);
	// console.log(coursesData[0]);

	// const courses = coursesData.map(course => {
	// 	return(
	// 		<CourseCard key={course.id} courseProp={course}/>
	// 	)
	// });


	// Create a function to fetch all courses
	const fetchData = () => {
		// use the route /all to get all active and not active courses (make sure that this route at the backend doesn't have jwt)
		//The fetch will be used to pass the data to Userview and Adminview, where:
			//Userview - only active courses will be shown
			//Adminview - shows all active and non-active courses
		fetch(`${process.env.REACT_APP_API_URL}/products/all`)
		.then(res => res.json())
		.then(data =>{
			console.log(data)

			// // Sets the "courses" state to map the data retrieved from the fetch request into several "CourseCard" components.
			// setCourses(data.map(course =>{
			// 	return(
			// 		<CourseCard key={course._id} courseProp={course} />
			// 	)
			// }))
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