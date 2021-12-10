import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import Loader from '../Loader'
import {
  getAdminUsersDetails,
  updateUserByAdmin,
} from '../../actions/userActions.js'
import { ADMIN_UPDATE_USER_RESET } from '../../constants'

const UserEditScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const history = useHistory()
  const location = useLocation()
  const path = location.pathname.split('/')[3]

  const dispatch = useDispatch()

  const adminUserDetails = useSelector((state) => state.adminUserDetails)
  const { Loading, user } = adminUserDetails

  const adminUpdateUser = useSelector((state) => state.adminUpdateUser)

  const {
    Loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = adminUpdateUser

  useEffect(() => {
    if (user._id !== path) {
      dispatch(getAdminUsersDetails(path))
    } else {
      setName(user.name)
      setEmail(user.email)
      setIsAdmin(user.isAdmin)
    }
    if (successUpdate) {
      toast.success(successUpdate)
      dispatch({ type: ADMIN_UPDATE_USER_RESET })
      history.push('/admin/users')
    }
  }, [path, user, dispatch, errorUpdate, successUpdate, history])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUserByAdmin(path, { _id: path, name, email, isAdmin }))
    if (errorUpdate) {
      toast.error('user could not be updated')
    }
    if (successUpdate) {
      toast.success('user updated')
    }
  }

  return (
    <>
      <Link to='/admin/users' className='btn btn-dark my-3'>
        {' '}
        Go Back
      </Link>
      <ToastContainer />
      <h1>Admin Edit User </h1>

      {loadingUpdate && <Loader />}
      {Loading ? (
        <Loader />
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='isAdmin'>
            <Form.Check
              type='checkbox'
              label='Is Admin'
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            ></Form.Check>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      )}
    </>
  )
}

export default UserEditScreen
