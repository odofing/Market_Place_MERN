import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader'
import img from '../../assests/login.svg'
import { login } from '../../actions/userActions'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)

  const { Loading, userInfo, error } = userLogin

  useEffect(() => {
    if (userInfo) {
      toast.success('Login was successful')
      window.location.replace('/')
    }
  }, [userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
    if (email && password) {
      if (error) {
        toast.error('invalid email or password')
      }
    } else {
      toast.error('fill all fields')
    }
  }

  return (
    <>
      <h1 className='mt-3'>Login</h1>

      {Loading && <Loader variant='danger'></Loader>}
      <Container className='mt-2'>
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

              <Form.Group controlId='password'>
                <Form.Label>password</Form.Label>
                <Form.Control
                  type='password'
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type='submit' variant='primary' className='mt-3'>
                login
              </Button>
            </Form>
            <Row className='py-3'>
              <Col>
                New User?
                <Link to='/register'>
                  <strong className='m-3'>Register</strong>
                </Link>
              </Col>
            </Row>
            <Row>
              <Col>
                Forgot Password?
                <Link to='/forgotpassword'>
                  <strong className='m-3'>Forgot Password</strong>
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

export default LoginScreen
