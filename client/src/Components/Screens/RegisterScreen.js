import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { Container } from 'react-bootstrap'
import img from '../../assests/welcome.svg'
import { Link } from 'react-router-dom'
import Loader from '../Loader'
import { register } from '../../actions/userActions.js'

const RegisterScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, message } = userRegister

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  const submitHandler = (e) => {
    e.preventDefault()

    if (name && email && password) {
      if (password !== confirmPassword) {
        toast.error('Passwords do no match')
      } else {
        dispatch(register(name, email, password))

        toast.success(message)
      }
    } else {
      toast.error('Please fill all fields')
    }
  }

  return (
    <>
      {loading && <Loader variant='danger'></Loader>}
      <h1 className='mt-5 mb-3'>Register </h1>
      <Container className='mt-2'>
        <ToastContainer />

        <Row>
          <Col md={4}>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='name'
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type='email'
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='password'>
                <Form.Label>password</Form.Label>
                <Form.Control
                  type='password'
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='confirmPassword'>
                <Form.Label>confirm password</Form.Label>
                <Form.Control
                  type='password'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type='submit' variant='primary' className='mt-3'>
                Register
              </Button>
            </Form>

            <Row className='py-3'>
              <Col>
                Have an account?
                <Link to='/login'>
                  {' '}
                  <strong className='m-3'>Login</strong>
                </Link>
              </Col>
            </Row>
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

export default RegisterScreen
