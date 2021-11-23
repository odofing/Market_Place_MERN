import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { Container } from 'react-bootstrap'
import { useLocation } from 'react-router';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader'
import { resetPassword } from '../../actions/userActions'



const  ResetPasswordScreen= () => {

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    const location = useLocation()
    const id = location.pathname.split("/")[2]
    const token = location.pathname.split("/")[3]
 

    const dispatch = useDispatch()

    const passwordReset = useSelector(state => state.passwordReset)
    console.log(passwordReset)
    const { Loading, message, error } = passwordReset

 useEffect(() => {

    if (message) {
        toast.success('password reset was successful')
        window.location.replace("/login")
    }
   },  [message] )


   const submitHandler = e => {
    e.preventDefault()
    dispatch(resetPassword(id, token, password))
    if (password && confirmPassword) {
        if (password !== confirmPassword){
            toast.error('passwords do not match')
        } if (error){
            toast.error(error)
        }
    } 
   }

    return (
        <>
              <h1>Reset Password</h1>
        {Loading && <Loader variant='success'></Loader>}
        <Container className='mt-2'> 
        <ToastContainer />
       
        <Row>
       
            <Col md={12}>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password'  onChange={(e) => setPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type='password'  onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='mt-3'>reset password</Button>
        </Form>
        </Col>
            </Row>
        </Container>
        </>
    )
}

export default ResetPasswordScreen



