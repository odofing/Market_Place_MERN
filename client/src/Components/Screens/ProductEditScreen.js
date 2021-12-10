import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { Container } from 'react-bootstrap'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, Link } from 'react-router-dom'
import Loader from '../Loader'
import { singleProduct, updateProduct } from '../../actions/productActions.js'
import { PRODUCT_UPDATE_RESET } from '../../constants'

const ProductEditScreen = () => {
  const [productName, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const location = useLocation()
  const path = location.pathname.split('/')[3]

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productSingle = useSelector((state) => state.productSingle)

  const {
    loading: productLoading,
    error: productError,
    product,
  } = productSingle

  const productUpdate = useSelector((state) => state.productUpdate)
  const { Loading, error, success } = productUpdate

  useEffect(() => {
    if (success) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      toast.success('update was successful')
      window.location.replace('/')
    }
    if (error) {
      toast.error(error)
    }
    if (product._id !== path) {
      dispatch(singleProduct(path))
    } else {
      setName(product.productName)
      setPrice(product.price)
      setImage(product.image)
      setBrand(product.brand)
      setCategory(product.category)
      setCountInStock(product.countInStock)
      setDescription(product.description)
    }
  }, [path, product, dispatch, error, success])

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
      updateProduct(path, {
        _id: userInfo._id,
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
      <ToastContainer />
      {/* <Link to={`/products/${product._id}`} className='btn btn-light my-3'> Go Back</Link> */}

      <Container>
        <h1>Edit Product </h1>
        <Link className='btn btn-dark my-3' to={`/products/${product._id}`}>
          Go Back
        </Link>
        {productLoading && <Loader />}
        {Loading ? (
          <Loader />
        ) : productError ? (
          'Product could not be loaded'
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                value={productName}
                onChange={(e) => setName(e.target.value)}
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

            <Button type='submit' variant='warning' className='mt-3 btn-block'>
              Update
            </Button>
          </Form>
        )}
      </Container>
    </>
  )
}

export default ProductEditScreen
