import React, { useState, useEffect, useContext } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';

export default function Register() {
    const { user } = useContext(UserContext);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [alert, setAlert] = useState({});

    function registerUser(e) {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                mobileNo: mobileNo,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.message === 'Registered Successfully') {
                setFirstName('');
                setLastName('');
                setEmail('');
                setMobileNo('');
                setPassword('');
                setConfirmPassword('');

                setAlert({
                    variant: 'success',
                    message: 'Registration Successful. Thank you for registering!'
                });

            } else if (data.error === 'Invalid email format') {
                setAlert({
                    variant: 'danger',
                    message: 'Email is invalid. Please make sure your email is correct.'
                });

            } else if (data.error === 'Mobile number is invalid') {
                setAlert({
                    variant: 'danger',
                    message: 'Mobile Number is invalid. Please make sure you\'re entering the correct Mobile Number.'
                });

            } else if (data.error === 'Password must be atleast 8 characters') {
                setAlert({
                    variant: 'danger',
                    message: 'Invalid Password. Password must be at least 8 characters long.'
                });

            } else if (data.error === 'Email already exists') {
                setAlert({
                    variant: 'danger',
                    message: 'Email already exists. Please enter a new Email.'
                });

            } else {
                setAlert({
                    variant: 'danger',
                    message: 'Something went wrong. Please try again later or contact us for assistance.'
                });
            }
        })
        .catch(error => {
            console.error('Error registering:', error);
            setAlert({
                variant: 'danger',
                message: 'Failed to register. Please try again later or contact us for assistance.'
            });
        });
    }

    useEffect(() => {
        const isValid =
            firstName !== '' &&
            lastName !== '' &&
            mobileNo !== '' &&
            email !== '' &&
            password !== '' &&
            confirmPassword !== '' &&
            mobileNo.length === 11 &&
            password === confirmPassword;

        setIsActive(isValid);
    }, [firstName, lastName, email, mobileNo, password, confirmPassword]);

    return (
        user.id !== null ? <Navigate to="/products" /> :
            <Form onSubmit={e => registerUser(e)} className="my-5 mx-auto" style={{ maxWidth: '400px' }}>
                <h1 className="text-center mb-4">Register</h1>

                {alert.message && (
                    <Alert key={alert.variant} variant={alert.variant}>
                        {alert.message}
                    </Alert>
                )}

                <Form.Group controlId="firstName">
                    <Form.Label>First Name:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter First Name"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="lastName">
                    <Form.Label>Last Name:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Last Name"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="mobileNo">
                    <Form.Label>Mobile No:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter 11 Digit Mobile No"
                        value={mobileNo}
                        onChange={e => setMobileNo(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                {isActive ?
                    <Button variant="primary" type="submit" className="w-100 mt-3">
                        Submit
                    </Button>
                    :
                    <Button variant="danger" type="submit" className="w-100 mt-3" disabled>
                        Submit
                    </Button>
                }
            </Form>
    );
}
