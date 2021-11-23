import {
  ADD_WISHLIST_FAIL,
  ADD_WISHLIST_REQUEST,
  ADD_WISHLIST_RESET,
  ADD_WISHLIST_SUCCESS,
  ADMIN_CREATE_USER_FAIL,
  ADMIN_CREATE_USER_REQUEST,
  ADMIN_CREATE_USER_SUCCESS,
  ADMIN_DELETE_ACCOUNT_RESET,
  ADMIN_UPDATE_USER_FAIL,
  ADMIN_UPDATE_USER_REQUEST,
  ADMIN_UPDATE_USER_RESET,
  ADMIN_UPDATE_USER_SUCCESS,
  ALL_USERS_DETAILS_FAIL,
  ALL_USERS_DETAILS_REQUEST,
  ALL_USERS_DETAILS_RESET,
  ALL_USERS_DETAILS_SUCCESS,
  USER_ACTIVATION_FAIL,
  USER_ACTIVATION_REQUEST,
  USER_ACTIVATION_SUCCESS,
  USER_DELETE_ACCOUNT_FAIL,
  USER_DELETE_ACCOUNT_REQUEST,
  USER_DELETE_ACCOUNT_RESET,
  USER_DELETE_ACCOUNT_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_FORGOT_PASSWORD_FAIL,
  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_RESET_PASSWORD_FAIL,
  USER_RESET_PASSWORD_REQUEST,
  USER_RESET_PASSWORD_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_SUCCESS,
} from '../constants'

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }

    case USER_REGISTER_SUCCESS:
      return { loading: false, message: action.payload }

    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const userActivationReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ACTIVATION_REQUEST:
      return { loading: true }

    case USER_ACTIVATION_SUCCESS:
      return { loading: false, success: action.payload }

    case USER_ACTIVATION_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const userUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true }

    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true }

    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload }

    case USER_UPDATE_PROFILE_RESET:
      return {
        user: {},
      }

    default:
      return state
  }
}

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }

    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const userForgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FORGOT_PASSWORD_REQUEST:
      return { loading: true }

    case USER_FORGOT_PASSWORD_SUCCESS:
      return { loading: false, message: action.payload }

    case USER_FORGOT_PASSWORD_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const userResetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_RESET_PASSWORD_REQUEST:
      return { loading: true }

    case USER_RESET_PASSWORD_SUCCESS:
      return { loading: false, message: action.payload }

    case USER_RESET_PASSWORD_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true }

    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload }

    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload }

    case USER_DETAILS_RESET:
      return { user: {} }

    default:
      return state
  }
}

export const wishlistAddReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_WISHLIST_REQUEST:
      return { loading: true, ...state }

    case ADD_WISHLIST_SUCCESS:
      return { loading: false, success: action.payload }

    case ADD_WISHLIST_FAIL:
      return { loading: false, error: action.payload }

    case ADD_WISHLIST_RESET:
      return {}

    default:
      return state
  }
}

export const userCreateByAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_CREATE_USER_REQUEST:
      return { loading: true }

    case ADMIN_CREATE_USER_SUCCESS:
      return { loading: false, message: action.payload }

    case ADMIN_CREATE_USER_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true }

    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload }

    case USER_LIST_FAIL:
      return { loading: false, error: action.payload }

    case USER_LIST_RESET:
      return { users: [] }
    default:
      return state
  }
}

export const adminUserDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case ALL_USERS_DETAILS_REQUEST:
      return { ...state, loading: true }

    case ALL_USERS_DETAILS_SUCCESS:
      return { loading: false, user: action.payload }

    case ALL_USERS_DETAILS_FAIL:
      return { loading: false, error: action.payload }

    case ALL_USERS_DETAILS_RESET:
      return { user: {} }

    default:
      return state
  }
}

export const updateUserByAdminReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case ADMIN_UPDATE_USER_REQUEST:
      return { loading: true }

    case ADMIN_UPDATE_USER_SUCCESS:
      return { loading: false, success: true }

    case ADMIN_UPDATE_USER_FAIL:
      return { loading: false, error: action.payload }

    case ADMIN_UPDATE_USER_RESET:
      return {
        user: {},
      }

    default:
      return state
  }
}

export const userDeleteAccountReducer = (
  state = { user: {}, product: {} },
  action
) => {
  switch (action.type) {
    case USER_DELETE_ACCOUNT_REQUEST:
      return { loading: true }

    case USER_DELETE_ACCOUNT_SUCCESS:
      return { loading: false, success: true }

    case USER_DELETE_ACCOUNT_FAIL:
      return { loading: false, error: action.payload }

    case USER_DELETE_ACCOUNT_RESET:
      return {
        user: {},
        product: {},
      }

    default:
      return state
  }
}
export const adminDeleteAccountReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_ACCOUNT_REQUEST:
      return { loading: true }

    case USER_DELETE_ACCOUNT_SUCCESS:
      return { loading: false, success: true }

    case USER_DELETE_ACCOUNT_FAIL:
      return { loading: false, error: action.payload }

    case ADMIN_DELETE_ACCOUNT_RESET:
      return {
        user: {},
        product: {},
      }

    default:
      return state
  }
}
