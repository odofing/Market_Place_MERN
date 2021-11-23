import React, { useEffect } from 'react'
import { Button, Table, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../Loader'
import { useHistory } from 'react-router-dom'
import {
  listProductsByAdmin,
  createProductByAdmin,
  deleteProductByAdmin,
} from '../../actions/productActions'

const AllProductsScreen = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const productListAdmin = useSelector((state) => state.productListAdmin)
  const {
    loading: loadingProductList,
    error: errorProductList,
    products,
  } = productListAdmin
  console.log()

  const productCreateByAdmin = useSelector(
    (state) => state.productCreateByAdmin
  )
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreateByAdmin

  const productDeleteByAdmin = useSelector(
    (state) => state.productDeleteByAdmin
  )

  const {
    error: errorDelete,
    success: successDelete,
  } = productDeleteByAdmin

  const userLogin = useSelector((state) => state.userLogin)

  const { userInfo } = userLogin

  useEffect(() => {
    // dispatch({ type: PRODUCT_CREATE_RESET })
    dispatch(listProductsByAdmin())
    if (!userInfo.isAdmin) {
      window.location.replace('/login')
    }

    if (successCreate) {
      toast.success('product created')
      history.push(`/admin/product/${createdProduct._id}/edit`)
    }
    if (errorCreate) {
      toast.error('product could not be created')
    }
    if (successDelete) {
      toast.success('product deleted')
      history.push('/admin/products')
    }
    if (errorDelete) {
      toast.error('product could not be deleted')
    }
  }, [
    dispatch,
    history,
    userInfo,
    errorCreate,
    successDelete,
    createdProduct,
    successCreate,
    errorDelete,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteProductByAdmin(id))
    }
  }

  const createProductHandler = () => {
    dispatch(createProductByAdmin())
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
          <ToastContainer />
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}

      {loadingProductList ? (
        <Loader />
      ) : errorProductList ? (
        <h6>products could not be loaded</h6>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>PRODUCT NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.productName}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>

                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button className='btn-sm' variant='light'>
                      <i className='fas fa-edit '></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    className='btn-sm'
                    variant='danger'
                    onClick={() => deleteHandler(product._id)}
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

export default AllProductsScreen
