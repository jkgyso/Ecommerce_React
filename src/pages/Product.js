import { useEffect, useState, useContext } from 'react';
import UserView from '../components/UserView';
import AdminView from '../components/AdminView';
import UserContext from '../UserContext';

export default function Products() {
	const { user } = useContext(UserContext);
	const [products, setProducts] = useState([]);
	const [error, setError] = useState('');

	const fetchData = () => {
		fetch(`${process.env.REACT_APP_API_BASE_URL}/products/all`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			if (typeof data.products !== 'string') {
				setProducts(data.products);
			} else { 
				setProducts([]);
			}
		})
		.catch(err => setError('Error fetching products.'));
	}

	useEffect(() => {
		let fetchUrl = user.isAdmin ? `${process.env.REACT_APP_API_BASE_URL}/products/all` : `${process.env.REACT_APP_API_BASE_URL}/products/active`;
		fetch(fetchUrl, {
			headers: { 
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			if (data.products && Array.isArray(data.products)) {
				setProducts(data.products);
			} else {
				setProducts([]);
			}
		})
		.catch(err => setError('Error fetching products.'));
	}, [user.isAdmin]);

	return (
		<>
			{error && <p>{error}</p>}
			{user.isAdmin ? (
				<AdminView productsData={products} fetchData={fetchData} />
			) : (
				<UserView productsData={products} />
			)}
		</>
	);
}
