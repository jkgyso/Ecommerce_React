import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function AddProduct(){

    const navigate = useNavigate();

    const { user } = useContext(UserContext);

    const [ name, setName ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ price, setPrice ] = useState(0);
    const [ image, setImage ] = useState("");
    const [ isActive, setIsActive ] = useState(false);

    useEffect(() => {
        if(name !== '' && description !== '' && price !== '') {

            setIsActive(true);

        } else {

            setIsActive(false);
        }

    }, [name, description, price]);

    function createProduct(e){

        e.preventDefault();

        let token = localStorage.getItem('token');

        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                name, // name: name
                description,
                price,
                image
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log('Response data:', data); 

            if(data.product.hasOwnProperty("_id")) {

                Swal.fire({
                    title: "Product Added",
                    icon:"success",
                    text: data.message 
                })

                navigate("/products");
                
            } else if (data.message === "Product already exists") {

                Swal.fire({
                    icon: "error",
                    title: "Product already exists",
                    text: data.message
                })
                
            } else {

                Swal.fire({
                    icon: "error",
                    title: "Failed to save product",
                })
            }
        })

        setName("")
        setDescription("")
        setPrice(0);
    }

    return (
        user.isAdmin === true ?
            <>
                <h1 className="my-5 text-center">Add Product</h1>
                <Form onSubmit={e => createProduct(e)}>
                    <Form.Group>
                        <Form.Label>Name:</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" required value={name} onChange={e => {setName(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description:</Form.Label>
                        <Form.Control type="text" placeholder="Enter Description" required value={description} onChange={e => {setDescription(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Price:</Form.Label>
                        <Form.Control type="number" placeholder="Enter Price" required value={price} onChange={e => {setPrice(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Image:</Form.Label>
                        <Form.Control type="text" placeholder="Enter Image URL" required value={image} onChange={e => {setImage(e.target.value)}}/>
                    </Form.Group>
                    { 
                    	isActive ? 
	                        <Button variant="primary" type="submit" id="submitBtn" className='my-2'>Submit</Button>
                        : 
                        <Button variant="danger" type="submit" id="submitBtn" className='my-2' disabled>Submit</Button>
                    }
                </Form>
            </>
        :
        	<Navigate to="/products" />
    )
}
