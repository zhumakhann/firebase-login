import React, { useRef, useState } from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext'
import { useHistory } from 'react-router-dom'
export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const {signUp} = useAuth()
    const [error, setError] = useState('')
    const history = useHistory()
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e){
        e.preventDefault();
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Passwords do not match')
        }
        try{
            setError('')
            setLoading(true)
            await signUp(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        } catch(err){
            setError('Sign up is failed')
            console.log(err);
        }
        setLoading(false)
    }
    return (
        <>

            <Card>
                <Card.Body>
                    <h2 className="text-center mb-3">Sign up</h2>
                    { error && <Alert variant="danger">{ error }</Alert> }
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' required="true" ref={emailRef} />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password confirm</Form.Label>
                            <Form.Control type='password' required="true" ref={passwordRef} />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password confirm</Form.Label>
                            <Form.Control type='password' required="true" ref={passwordConfirmRef} />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type='submit' children="sign up" />
                    </Form>
                </Card.Body>
            </Card>  
            <div className="w-100 text-center mt-w">

            </div> 
        </>
    )
}
