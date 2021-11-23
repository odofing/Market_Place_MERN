import React, { useEffect } from 'react'
import { Button, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../Loader'
import { listUsers, adminDeleteAccount } from '../../actions/userActions.js'
import { toast } from 'react-toastify'

const AllUsersScreen = () => {
  const dispatch = useDispatch()

  const usersList = useSelector((state) => state.usersList)
  const { loading, error, users } = usersList

  const deleteAccountByAdmin = useSelector(
    (state) => state.deleteAccountByAdmin
  )

  const { error: errorAdminDelete } = deleteAccountByAdmin

  const userLogin = useSelector((state) => state.userLogin)

  const { userInfo } = userLogin

  useEffect(() => {
    if (errorAdminDelete) {
      toast.error('user could not be deleted')
    }
    if (adminDeleteAccount)
      if (userInfo && userInfo.isAdmin) {
        dispatch(listUsers())
      } else {
        window.location.replace('/login')
      }
  }, [dispatch, userInfo, errorAdminDelete])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      if (userInfo && userInfo.isAdmin) {
        dispatch(adminDeleteAccount(), { id })
      }
    }
  }
  return (
    <>
      <h1>users</h1>
      <LinkContainer to='/admin/create' className='mb-3'>
        <Col className='text-right'>
          <Button>
            <i className='fas fa-plus'></i> Create User
          </Button>
        </Col>
      </LinkContainer>
      {loading ? (
        <Loader />
      ) : error ? (
        <h5 className='mt-5'>no users found</h5>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id.substring(0, 7)}</td>
                <td>{user.name}</td>
                <td>
                  {' '}
                  <a href={`mailto:${user.email}`}> {user.email}</a>{' '}
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}`}>
                    <Button className='btn-sm' variant='light'>
                      <i className='fas fa-edit '></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    className='btn-sm'
                    variant='danger'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default AllUsersScreen
