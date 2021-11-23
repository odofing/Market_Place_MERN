import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { Form, Button, Col, Row, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader'
import { productCreate } from '../../actions/productActions.js'

const AddProductScreen = () => {
  const [productName, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const createProduct = useSelector((state) => state.createProduct)

  const { Loading, error, product } = createProduct

  useEffect(() => {
    if (product) {
      toast.success('product added successfully')
      window.location.replace('/')
    }
  }, [product])

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
      toast.error('error uploading image')
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if (
      productName &&
      image &&
      brand &&
      category &&
      description &&
      price &&
      countInStock
    ) {
      dispatch(
        productCreate(
          productName,
          image,
          brand,
          category,
          description,
          price,
          countInStock
        )
      )
    } else {
      toast.error('Please fill all fields')
    }
  }

  return (
    <>
      <Container>
        <h1 className='mt-3 mb-5'>Add Product </h1>
        {Loading && <Loader />}
        <ToastContainer />
        {/* {error && <Message variant='danger'>{errorUpdate}</Message> } */}
        {Loading ? (
          <Loader />
        ) : error ? (
          toast.error('invalid email or password')
        ) : (
          <Row>
            <Col lg={10}>
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='name'
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='price'>
                  <Form.Label>price</Form.Label>
                  <Form.Control
                    type='number'
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
                    onChange={(e) => setBrand(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='countInStock'>
                  <Form.Label>count In Stock</Form.Label>
                  <Form.Control
                    type='number'
                    onChange={(e) => setCountInStock(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='category'>
                  <Form.Label>category</Form.Label>
                  <Form.Control
                    type='text'
                    onChange={(e) => setCategory(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='description'>
                  <Form.Label>description</Form.Label>
                  <Form.Control
                    type='text'
                    onChange={(e) => setDescription(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='mt-3'>
                  Add product
                </Button>
              </Form>
            </Col>
          </Row>
        )}
      </Container>
    </>
  )
}

export default AddProductScreen
