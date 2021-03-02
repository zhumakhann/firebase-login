import React, { useRef, useState } from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext'
import { useHistory, Link } from 'react-router-dom'
export default function ForgotPassword() {
    const {resetPassword} = useAuth()
    const emailRef = useRef();
    const [error, setError] = useState('')
    const [ message, setMessage ] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e){
        e.preventDefault();
        try{
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('check your inbox')
            // history.push('/')
        } catch(err){
            setError('Failed to reset')
            console.log(err);
        }
        setLoading(false)
    }
    return (
        <>

            <Card>
                <Card.Body>
                    <h2 className="text-center mb-3">Reset password</h2>
                    { error && <Alert variant="danger">{ error }</Alert> }
                    { message && <Alert variant="success">{ message }</Alert> }
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' required="true" ref={emailRef} />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type='submit' children="Reset password" />
                    </Form>
                <div className="w-100 text-center mt-3">
                    <Link to="/Login">Login</Link>
                </div> 
                </Card.Body>
            </Card>  
            <div className="w-100 text-center mt-w">

            </div> 
        </>
    )
}


