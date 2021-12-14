import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useHistory, Link } from 'react-router-dom'
import Loader from '../Loader'
import {
  singleProduct,
  updateProductbyAdmin,
} from '../../actions/productActions'
import { ADMIN_UPDATE_ALL_PRODUCTS_RESET } from '../../constants'

const AdminEditProductScreen = () => {
  const [productName, setProductName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const history = useHistory()
  const location = useLocation()
  const path = location.pathname.split('/')[3]

  const dispatch = useDispatch()

  const productSingle = useSelector((state) => state.productSingle)

  const { Loading, error, product } = productSingle

  const productUpdateByAdmin = useSelector(
    (state) => state.productUpdateByAdmin
  )
  const {
    Loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdateByAdmin

  useEffect(() => {
    if (product._id !== path) {
      dispatch(singleProduct(path))
    } else {
      setProductName(product.productName)
      setPrice(product.price)
      setImage(product.image)
      setBrand(product.brand)
      setCategory(product.category)
      setCountInStock(product.countInStock)
      setDescription(product.description)
    }
    if (successUpdate) {
      toast.success(' product updated')
      dispatch({ type: ADMIN_UPDATE_ALL_PRODUCTS_RESET })
      history.push('/admin/products')
    }
    if (errorUpdate) {
      toast.error('product could not be updated')
    }
  }, [
    // product.productName,
    // product.brand,
    // product.price,
    // product.image,
    // product.category,
    // product.description,
    // product.countInStock,
    product,
    path,
    dispatch,
    history,
    successUpdate,
    errorUpdate,
  ])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const { data } = await axios.post('/api/upload', formData, config)
      setImage(data)
      setUploading(false)
    } catch (error) {
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProductbyAdmin(path, {
        path,
        productName,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    )
  }

  return (
    <>
      <Link to='/admin/products' className='btn btn-light my-3'>
        {' '}
        Go Back
      </Link>

      <ToastContainer />
      <h1>Edit Product </h1>
      {loadingUpdate && <Loader />}
      {/* {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>} */}
      {Loading ? (
        <Loader />
      ) : error ? (
        // <Message variant='danger'>{error}</Message>
        <h1>error</h1>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='price'>
            <Form.Label>price</Form.Label>
            <Form.Control
              type='number'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='image'>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type='text'
              value={image}
              placeholder='enter image url'
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
            <Form.File
              id='image-file'
              label='choose file'
              custom
              onChange={uploadFileHandler}
            ></Form.File>
            {uploading && <Loader />}
          </Form.Group>

          <Form.Group controlId='brand'>
            <Form.Label>brand</Form.Label>
            <Form.Control
              type='text'
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='countInStock'>
            <Form.Label>count In Stock</Form.Label>
            <Form.Control
              type='number'
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='category'>
            <Form.Label>category</Form.Label>
            <Form.Control
              type='text'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='description'>
            <Form.Label>description</Form.Label>
            <Form.Control
              type='text'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      )}
    </>
  )
}

export default AdminEditProductScreen
