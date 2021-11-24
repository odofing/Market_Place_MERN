import {
  USER_ACTIVATION_FAIL,
  USER_ACTIVATION_REQUEST,
  USER_ACTIVATION_SUCCESS,
  USER_FORGOT_PASSWORD_FAIL,
  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_RESET_PASSWORD_REQUEST,
  USER_RESET_PASSWORD_SUCCESS,
  USER_RESET_PASSWORD_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  ADD_WISHLIST_REQUEST,
  ADD_WISHLIST_SUCCESS,
  ADD_WISHLIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  ALL_USERS_DETAILS_REQUEST,
  ALL_USERS_DETAILS_SUCCESS,
  ALL_USERS_DETAILS_FAIL,
  ADMIN_UPDATE_USER_REQUEST,
  ADMIN_UPDATE_USER_SUCCESS,
  ADMIN_UPDATE_USER_FAIL,
  ADMIN_CREATE_USER_REQUEST,
  ADMIN_CREATE_USER_SUCCESS,
  ADMIN_CREATE_USER_FAIL,
  USER_DELETE_ACCOUNT_REQUEST,
  USER_DELETE_ACCOUNT_SUCCESS,
  USER_DELETE_ACCOUNT_FAIL,
} from '../constants'
import axios from 'axios'

const url = 'https://themarketplaceapp.herokuapp.com/'

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post(
      `${url}/api/users/register`,
      { name, email, password },
      config
    )

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data.message })
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const activateAccount = (token) => async (dispatch) => {
  try {
    dispatch({ type: USER_ACTIVATION_REQUEST })

    const { data } = await axios.post(`${url}/api/users/activate`, { token })

    dispatch({ type: USER_ACTIVATION_SUCCESS, payload: data.success })
  } catch (error) {
    dispatch({
      type: USER_ACTIVATION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      `${url}/api/users/login`,
      { email, password },
      config
    )

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
}

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: USER_FORGOT_PASSWORD_REQUEST })

    const { data } = await axios.post(`${url}/api/users/forgotpassword`, {
      email,
    })

    dispatch({ type: USER_FORGOT_PASSWORD_SUCCESS, payload: data.success })
  } catch (error) {
    dispatch({
      type: USER_FORGOT_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const resetPassword = (id, token, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_RESET_PASSWORD_REQUEST })

    const { data } = await axios.put(
      `${url}/api/users/resetpassword/${id}/${token}`,
      { id, token, password }
    )

    dispatch({ type: USER_RESET_PASSWORD_SUCCESS, payload: data.message })
  } catch (error) {
    dispatch({
      type: USER_RESET_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`${url}/api/users/profile`, user, config)

    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data })

    // dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`${url}/api/users/${id}`, config)

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const addToWishlists = (id, productId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_WISHLIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(
      `${url}/api/users/${id}/add-wishlist`,
      productId,
      config
    )

    dispatch({ type: ADD_WISHLIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ADD_WISHLIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createUserByAdmin =
  (name, email, password, isAdmin) => async (dispatch, getState) => {
    const {
      userLogin: { userInfo },
    } = getState()

    try {
      dispatch({ type: ADMIN_CREATE_USER_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.post(
        `${url}/api/users/admin`,
        { name, email, password, isAdmin },
        config
      )

      dispatch({ type: ADMIN_CREATE_USER_SUCCESS, payload: data.message })
    } catch (error) {
      dispatch({
        type: ADMIN_CREATE_USER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`${url}/api/users`, config)

    dispatch({ type: USER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getAdminUsersDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ALL_USERS_DETAILS_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`${url}/api/users/admin/${id}`, config)

    dispatch({ type: ALL_USERS_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ALL_USERS_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateUserByAdmin = (id, user) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_UPDATE_USER_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`${url}/api/users/admin/${id}`, user, config)

    dispatch({ type: ADMIN_UPDATE_USER_SUCCESS })

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const userDeleteAccount = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_ACCOUNT_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.delete(`${url}/api/users/delete/${id}`, config)

    dispatch({
      type: USER_DELETE_ACCOUNT_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: USER_DELETE_ACCOUNT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const adminDeleteAccount = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_ACCOUNT_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.delete(`${url}/api/users/admin/delete`, { id }, config)

    dispatch({
      type: USER_DELETE_ACCOUNT_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: USER_DELETE_ACCOUNT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
