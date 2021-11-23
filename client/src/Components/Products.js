import React, { useEffect } from 'react'
import { Row, Col, Card, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions.js'
import Ratings from './Ratings'
import Loader from '../Components/Loader'

const Products = () => {
  const dispatch = useDispatch()
  const productLists = useSelector((state) => state.productLists)
  const { products, loading, error } = productLists

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])




  return (
    <>
      <Container>
        {loading ? (
          <Loader />
        ) : error ? (
          <h4 className='mt-5'>products could not be loaded</h4>
        ) : (
          <Row className='mt-5 m-auto'>
            {products.map((product, index) => (
              <Col md={4} lg={3} key={index} className='m-auto'>
                <Card className='my-3 p-3 rounded bg-dark'>
                  <Link to={`/products/${product._id}`}>
                    <Card.Img src={product.image} variant='top' />

                    <Card.Body className='text-white'>
                      <Card.Title as='div'>
                        <strong>{product.productName}</strong>
                      </Card.Title>

                      <Card.Text className='text-white' as='div'>
                        {' '}
                        {product.brand}{' '}
                      </Card.Text>
                      <Card.Text className='text-white' as='h6'>
                        {' '}
                        N{product.price}
                      </Card.Text>
                      <Card.Text as='div'>
                        <Ratings
                          value={product.rating}
                          text={`${product.numReviews} Reviews`}
                          color='gold'
                        />
                      </Card.Text>
                      <Card.Text as='h5' className='text-white'>
                        {' '}
                        ${product.price}
                      </Card.Text>
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  )
}

export default Products
