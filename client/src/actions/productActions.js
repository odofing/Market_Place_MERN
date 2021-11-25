import {
  ADMIN_CREATE_PRODUCT_FAIL,
  ADMIN_CREATE_PRODUCT_REQUEST,
  ADMIN_CREATE_PRODUCT_SUCCESS,
  ADMIN_DELETE_PRODUCT_FAIL,
  ADMIN_DELETE_PRODUCT_REQUEST,
  ADMIN_DELETE_PRODUCT_SUCCESS,
  ADMIN_GET_ALL_PRODUCTS_FAIL,
  ADMIN_GET_ALL_PRODUCTS_REQUEST,
  ADMIN_GET_ALL_PRODUCTS_SUCCESS,
  ADMIN_UPDATE_ALL_PRODUCTS_FAIL,
  ADMIN_UPDATE_ALL_PRODUCTS_REQUEST,
  ADMIN_UPDATE_ALL_PRODUCTS_SUCCESS,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  MY_PRODUCTS_FAIL,
  MY_PRODUCTS_REQUEST,
  MY_PRODUCTS_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  SINGLE_PRODUCT_FAIL,
  SINGLE_PRODUCT_REQUEST,
  SINGLE_PRODUCT_SUCCESS,
} from '../constants'
import axios from 'axios'

export const productCreate =
  (productName, image, brand, category, description, price, countInStock) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_PRODUCT_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.post(
        `https://themarketplaceapp.herokuapp.com/api/products`,
        {
          productName,
          image,
          brand,
          category,
          description,
          price,
          countInStock,
        },
        config
      )

      dispatch({
        type: CREATE_PRODUCT_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: CREATE_PRODUCT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })

    const { data } = await axios.get(
      `https://themarketplaceapp.herokuapp.com/api/products`
    )

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const singleProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: SINGLE_PRODUCT_REQUEST })

    const { data } = await axios.get(
      `https://themarketplaceapp.herokuapp.com/api/products/${id}`
    )

    dispatch({ type: SINGLE_PRODUCT_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: SINGLE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateProduct = (id, product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.put(
      `https://themarketplaceapp.herokuapp.com/api/products/edit/${id}`,
      product,
      config
    )

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteProduct = (path, userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(
      `https://themarketplaceapp.herokuapp.com/api/products/delete/${path}`,
      userId,
      config
    )

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      await axios.post(
        `https://themarketplaceapp.herokuapp.com/api/products/${productId}/reviews`,
        review,
        config
      )

      dispatch({
        type: PRODUCT_CREATE_REVIEW_SUCCESS,
      })
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const getMyProducts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MY_PRODUCTS_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(
      `https://themarketplaceapp.herokuapp.com/api/products/myproducts`,
      config
    )

    dispatch({
      type: MY_PRODUCTS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: MY_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listProductsByAdmin = () => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState()
  try {
    dispatch({ type: ADMIN_GET_ALL_PRODUCTS_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(
      `https://themarketplaceapp.herokuapp.com/api/products/admin`,
      config
    )

    dispatch({ type: ADMIN_GET_ALL_PRODUCTS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ADMIN_GET_ALL_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createProductByAdmin = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_CREATE_PRODUCT_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.post(
      `https://themarketplaceapp.herokuapp.com/api/products/admin`,
      {},
      config
    )

    dispatch({
      type: ADMIN_CREATE_PRODUCT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ADMIN_CREATE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateProductbyAdmin =
  (id, product) => async (dispatch, getState) => {
    try {
      dispatch({ type: ADMIN_UPDATE_ALL_PRODUCTS_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.put(
        `https://themarketplaceapp.herokuapp.com/api/products/admin/${id}`,
        product,
        config
      )

      dispatch({
        type: ADMIN_UPDATE_ALL_PRODUCTS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ADMIN_UPDATE_ALL_PRODUCTS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const deleteProductByAdmin = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_DELETE_PRODUCT_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.delete(
      `https://themarketplaceapp.herokuapp.com/api/products/delete/admin/${id}`,
      config
    )

    dispatch({
      type: ADMIN_DELETE_PRODUCT_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
