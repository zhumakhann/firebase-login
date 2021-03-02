import React, { useRef, useState } from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext'
import { useHistory } from 'react-router-dom'
export default function UpdateProfile() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { currentUser, updateEmail, updatePassword } = useAuth()
    const [error, setError] = useState('')
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    function handleSubmit(e){
        e.preventDefault();
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Passwords do not match')
        }
        const promises = []
        if(emailRef.current.value !== currentUser.email){
            promises.push(updateEmail(emailRef.current.value))
        }
        if(passwordRef.current.value){
            promises.push(updatePassword(passwordRef.current.value))
        }
        Promise.all(promises).then(() => {
            history.push('/')
        }).catch(() => {
            setError('failed to change')
        }).finally(() => {
            setLoading(false)
        })
    }
    return (
        <>

            <Card>
                <Card.Body>
                    <h2 className="text-center mb-3">Update profile</h2>
                    { error && <Alert variant="danger">{ error }</Alert> }
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef} 
                                defaultValue={ currentUser.email }
                            />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password confirm</Form.Label>
                            <Form.Control type='password' ref={passwordRef} placeholder="Leave the blank to keep the same" />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password confirm</Form.Label>
                            <Form.Control type='password' ref={passwordConfirmRef} placeholder="Leave the blank to keep the same" />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type='submit' children="Update" />
                    </Form>
                </Card.Body>
            </Card>  
            <div className="w-100 text-center mt-w">

            </div> 
        </>
    )
}

