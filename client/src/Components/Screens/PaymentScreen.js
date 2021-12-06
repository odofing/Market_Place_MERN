import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../Loader'
import StripeCheckout from 'react-stripe-checkout'
import { Container } from 'react-bootstrap'

import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { singleProduct } from '../../actions/productActions.js'

const PaymentScreen = () => {
  const productSingle = useSelector((state) => state.productSingle)
  const { loading, error, product } = productSingle
  console.log(product)

  const [payProduct, setPayProduct] = useState({
    name: product.productName,
    price: product.price,
    brand: product.brand,
  })

  const makePayment = (token) => {
    const body = {
      token,
      payProduct,
    }
    const headers = {
      'Content-Type': 'application/json',
    }

    const { data } = axios.post(`/api/products/pay`, {
      headers,
      body: JSON.stringify(body),
    })
    console.log(data)
  }
  const location = useLocation()
  const path = location.pathname.split('/')[3]

  const dispatch = useDispatch()

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
          {/* <Button
            className='btn mt-3'
            variant='dark'
            onClick={() => paymentHandler(path)}
          >
            PAY
          </Button> */}
          <StripeCheckout
            stripeKey={process.env.REACT_APP_STRIPE_KEY}
            token='token'
            image={product.image}
            name={product.productName}
            amount={product.price * 100}
          />
        </>
      )}
    </Container>
  )
}

export default PaymentScreen
