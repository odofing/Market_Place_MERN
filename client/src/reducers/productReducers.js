import {
  ADMIN_CREATE_PRODUCT_FAIL,
  ADMIN_CREATE_PRODUCT_REQUEST,
  ADMIN_CREATE_PRODUCT_RESET,
  ADMIN_CREATE_PRODUCT_SUCCESS,
  ADMIN_DELETE_PRODUCT_FAIL,
  ADMIN_DELETE_PRODUCT_REQUEST,
  ADMIN_DELETE_PRODUCT_SUCCESS,
  ADMIN_GET_ALL_PRODUCTS_FAIL,
  ADMIN_GET_ALL_PRODUCTS_REQUEST,
  ADMIN_GET_ALL_PRODUCTS_SUCCESS,
  ADMIN_UPDATE_ALL_PRODUCTS_FAIL,
  ADMIN_UPDATE_ALL_PRODUCTS_REQUEST,
  ADMIN_UPDATE_ALL_PRODUCTS_RESET,
  ADMIN_UPDATE_ALL_PRODUCTS_SUCCESS,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_RESET,
  CREATE_PRODUCT_SUCCESS,
  MY_PRODUCTS_FAIL,
  MY_PRODUCTS_REQUEST,
  MY_PRODUCTS_RESET,
  MY_PRODUCTS_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_SUCCESS,
  SINGLE_PRODUCT_FAIL,
  SINGLE_PRODUCT_REQUEST,
  SINGLE_PRODUCT_SUCCESS,
} from '../constants'

export const createProductReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return { loading: true }

    case CREATE_PRODUCT_SUCCESS:
      return { loading: false, success: true, product: action.payload }

    case CREATE_PRODUCT_FAIL:
      return { loading: false, error: action.payload }

    case CREATE_PRODUCT_RESET:
      return {}

    default:
      return state
  }
}

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] }

    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload }

    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const singleProductReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case SINGLE_PRODUCT_REQUEST:
      return { loading: true, ...state }

    case SINGLE_PRODUCT_SUCCESS:
      return { loading: false, product: action.payload }

    case SINGLE_PRODUCT_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true }

    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload }

    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload }

    case PRODUCT_UPDATE_RESET:
      return { product: {} }

    default:
      return state
  }
}

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true }

    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true }

    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const productCreateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true }

    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }

    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload }

    case PRODUCT_CREATE_REVIEW_RESET:
      return {}

    default:
      return state
  }
}

export const myProductsGetReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case MY_PRODUCTS_REQUEST:
      return {
        loading: true,
      }

    case MY_PRODUCTS_SUCCESS:
      return {
        loading: false,
        success: true,
        products: action.payload,
      }

    case MY_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    case MY_PRODUCTS_RESET:
      return { products: [] }

    default:
      return state
  }
}

export const productListByAdminReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ADMIN_GET_ALL_PRODUCTS_REQUEST:
      return { loading: true, products: [] }

    case ADMIN_GET_ALL_PRODUCTS_SUCCESS:
      return { loading: false, products: action.payload }

    case ADMIN_GET_ALL_PRODUCTS_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const productCreateByAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_CREATE_PRODUCT_REQUEST:
      return { loading: true }

    case ADMIN_CREATE_PRODUCT_SUCCESS:
      return { loading: false, success: true, product: action.payload }

    case ADMIN_CREATE_PRODUCT_FAIL:
      return { loading: false, error: action.payload }

    case ADMIN_CREATE_PRODUCT_RESET:
      return {}

    default:
      return state
  }
}

export const productUpdateByAdminReducer = (
  state = { product: {} },
  action
) => {
  switch (action.type) {
    case ADMIN_UPDATE_ALL_PRODUCTS_REQUEST:
      return { loading: true }

    case ADMIN_UPDATE_ALL_PRODUCTS_SUCCESS:
      return { loading: false, success: true, product: action.payload }

    case ADMIN_UPDATE_ALL_PRODUCTS_FAIL:
      return { loading: false, error: action.payload }

    case ADMIN_UPDATE_ALL_PRODUCTS_RESET:
      return { product: {} }

    default:
      return state
  }
}

export const productDeleteByAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_DELETE_PRODUCT_REQUEST:
      return { loading: true }

    case ADMIN_DELETE_PRODUCT_SUCCESS:
      return { loading: false, success: true }

    case ADMIN_DELETE_PRODUCT_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}
