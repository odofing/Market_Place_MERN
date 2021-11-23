import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Row, Col } from 'react-bootstrap'
import { Container } from 'react-bootstrap'
import Loader from '../Loader'
import { useLocation } from 'react-router-dom'
import jwt from 'jsonwebtoken'
import { activateAccount } from '../../actions/userActions.js'

const ActivationScreen = () => {
  const location = useLocation()
  const path = location.pathname.split('/')[2]
  let { name } = jwt.decode(path)

  const dispatch = useDispatch()

  const userActivation = useSelector((state) => state.userActivation)

  const { loading, error, success } = userActivation

  useEffect(() => {
    if (success) {
      toast.success('Account sucessfully created')
      success && window.location.replace('/login')
    }
  }, [success])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(activateAccount(path))
    if (error) {
      toast.error(error)
    }
  }

  return (
    <Container className='p-3'>
      {loading && <Loader variant='danger'></Loader>}
      <h1>Activate Account</h1>
      <ToastContainer />
      <Row>
        <Col md={12}>
          <h4 className='pt-5'>Hi, {name}</h4>
        </Col>
      </Row>
      <Button type='submit' className='mt-3' onClick={submitHandler}>
        Activate Acccount
      </Button>
    </Container>
  )
}

export default ActivationScreen
