import React, { useEffect } from 'react'
import axios from 'axios'
import Loader from '../Loader'
import { Button, Container } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { singleProduct } from '../../actions/productActions.js'

const PaymentScreen = () => {
  const location = useLocation()
  const path = location.pathname.split('/')[3]

  const dispatch = useDispatch()

  const productSingle = useSelector((state) => state.productSingle)

  const { loading, error, product } = productSingle
  console.log(product)

  useEffect(() => {
    if (path) {
      dispatch(singleProduct(path))
    }
  }, [path, dispatch, error])

  const paymentHandler = (path) => {
    if (window.confirm('Are you sure you want to make payment?')) {
      //  dispatch(deleteProduct(path, { userId: userInfo._id }))
    }
  }

  return (
    <Container>
      <h1>Make Payment </h1>
      <Link className='btn btn-danger mb-5' to={`/products/${product._id}`}>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        'Payment page could not be loaded'
      ) : (
        <>
          <h5>Product ID: {product._id}</h5>
          <h5>Product Name:{product.productName}</h5>
          <h5> ₦: {product.price}</h5>
          <Button
            className='btn mt-3'
            variant='dark'
            onClick={() => paymentHandler(path)}
          >
            PAY
          </Button>
        </>
      )}
    </Container>
  )
}

export default PaymentScreen
