import React, { useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Link, useHistory } from 'react-router-dom'
export default function Dashboard() {
    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const histroy = useHistory()

    async function handleLogout(){
        setError('')
        try{
            await logout()
            histroy.push('/login')
        }catch{
            setError('failed to logout')
        }
    }
    console.log(currentUser);
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-3">Profile</h2>
                    { error && <Alert variant="danger">{ error }</Alert> }
                    <strong>Email: </strong>{ currentUser.email }
                    <Link className="btn btn-primary w-100 mt-3" to="/update-profile">
                        update profile
                    </Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button 
                    variant="link"
                    onClick={handleLogout}
                >
                    Log out
                </Button>
            </div>
        </>
    )
}
