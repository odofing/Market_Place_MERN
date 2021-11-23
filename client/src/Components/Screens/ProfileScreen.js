import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loader from '../Loader'
import { LinkContainer } from 'react-router-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import {
  USER_UPDATE_PROFILE_RESET,
  USER_DELETE_ACCOUNT_RESET,
} from '../../constants/index.js'
import {
  getUserDetails,
  updateUserProfile,
  userDeleteAccount,
  logout,
} from '../../actions/userActions'
import { getMyProducts } from '../../actions/productActions'

const ProfileScreen = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const history = useHistory()

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)

  const { error: userDetailsError, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)

  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)

  const { success, error, loading } = userUpdateProfile

  const userProducts = useSelector((state) => state.userProducts)

  const {
    error: errorProducts,
    loading: loadingProducts,
    products,
  } = userProducts

  const accountDeleteUser = useSelector((state) => state.accountDeleteUser)

  const { error: errorDeleteAccount, success: successDeleteAccount } =
    accountDeleteUser

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserDetails(userInfo._id))
      dispatch(getMyProducts())
    }
    if (!user.name) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET })
    } else {
      setName(user.name)
    }
    if (userDetailsError) {
      toast.error('User details could not be loaded')
    }
    if (success) {
      toast.success('Profile updated')
      setName('')
      setPassword('')
      setConfirmPassword('')
    }
    if (error) {
      toast.error('Profile could not be updated')
    }
    if (successDeleteAccount) {
      dispatch({ type: USER_DELETE_ACCOUNT_RESET })
      toast.success('account successfully deleted')
    }
    if (errorDeleteAccount) {
      toast.error('account could not be deleted')
    }
    if (successDeleteAccount) {
      dispatch(logout())
      window.location.replace('/')
    }
  }, [
    dispatch,
    userInfo,
    history,
    success,
    user.name,
    error,
    userDetailsError,
    successDeleteAccount,
    errorDeleteAccount,
  ])

  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
    } else {
      dispatch(updateUserProfile({ id: userInfo._id, name, password }))
    }
  }

  const deleteAccountHandler = (id) => {
    dispatch(userDeleteAccount(id))
    window.confirm('Are you sure you want to delete your account?')
  }

  return (
    <>
      <Link className='btn btn-danger my-3' to='/'>
        Go Back
      </Link>
      <Row>
        {loading && <Loader variant='danger'></Loader>}

        <ToastContainer />
        <Col md={3}>
          <h3>User Profile</h3>

          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
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
              Update Profile
            </Button>
          </Form>
        </Col>
        <Col md={9}>
          <h4> My products </h4>

          {loadingProducts ? (
            <Loader />
          ) : errorProducts ? (
            <>
              <h1>no products found</h1>
              <Link className='btn btn-danger my-3' to='/add-product'>
                add product
              </Link>
            </>
          ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>product ID</th>
                  <th>PRICE</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id.substring(0, 7)}</td>
                    <td>{product.price}</td>

                    <td>
                      <LinkContainer to={`/products/${product._id}`}>
                        <Button className='btn-sm' variant='light'>
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
      <Row>
        <Col className='text-center mt-5'>
          <Button
            className='text-danger btn-md bg-light'
            onClick={() => deleteAccountHandler(user._id)}
          >
            delete account
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default ProfileScreen
