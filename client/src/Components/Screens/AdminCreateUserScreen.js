import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import Loader from '../Loader'
import { createUserByAdmin } from '../../actions/userActions'

const AdminCreateUserScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const history = useHistory()
  const dispatch = useDispatch()

  const userCreate = useSelector((state) => state.userCreate)

  const { loading, error, message } = userCreate
  console.log(message)

  useEffect(() => {
    if (message) {
      setName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setIsAdmin(false)
      toast.success(message)
      history.push('/admin/users')
    }
  }, [message, history])

  const submitHandler = (e) => {
    e.preventDefault()

    if (name && email && password) {
      if (password !== confirmPassword) {
        toast.error('Passwords do no match')
      } else {
        dispatch(createUserByAdmin(name, email, password))
        toast.error(error)
      }
    } else {
      toast.error('Please fill all fields')
    }
  }

  return (
    <>
      {loading && <Loader variant='danger'></Loader>}
      <h1>CREATE USER BY ADMIN </h1>
      <Link to='/admin/users' className='btn btn-dark my-3'>
        {' '}
        Go Back
      </Link>
      <Container className='mt-2'>
        <ToastContainer />

        <Row>
          <Col md={12}>
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

              <Form.Group controlId='isAdmin'>
                <Form.Check
                  type='checkbox'
                  label='Is Admin'
                  //  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                ></Form.Check>
              </Form.Group>

              <Button type='submit' variant='primary' className='mt-3'>
                create
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
        </Row>
      </Container>
    </>
  )
}
export default AdminCreateUserScreen
