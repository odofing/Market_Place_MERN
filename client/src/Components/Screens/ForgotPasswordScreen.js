import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { Container } from 'react-bootstrap'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader'
import img from '../../assests/forget.svg'
import { Link } from 'react-router-dom'
import { forgotPassword } from '../../actions/userActions'

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('')

  const dispatch = useDispatch()

  const userForgotPassword = useSelector((state) => state.userForgotPassword)

  const { Loading, message, error } = userForgotPassword

  useEffect(() => {}, [])

  const submitHandler = (e) => {
    e.preventDefault()
    if (email === '') {
      toast.error('email field is empty')
    }
    if (message === true) {
      toast.success(`check your email ${email} for password reset link`)
    }
    if (error) {
      toast.error('Mail could not be sent, try again')
    } else dispatch(forgotPassword(email))
  }

  return (
    <>
      <Link to='/login' className='btn btn-danger mt-3'>
        {' '}
        Go Back
      </Link>
      <h1 className='mt-3'>Forgot Password</h1>
      {Loading && <Loader variant='danger'></Loader>}
      <Container>
        <ToastContainer />

        <Row>
          <Col md={4}>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type='email'
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type='submit' variant='primary' className='mt-3'>
                submit
              </Button>
            </Form>
          </Col>
          <Col md={8}>
            <img
              src={img}
              alt=''
              width='90%'
              height='70%'
              className='img d-none d-lg-block'
            />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ForgotPasswordScreen
