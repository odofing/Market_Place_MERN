import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  userRegisterReducer,
  userActivationReducer,
  userLoginReducer,
  userForgotPasswordReducer,
  userResetPasswordReducer,
  userUpdateReducer,
  userDetailsReducer,
  userListReducer,
  wishlistAddReducer,
  adminUserDetailsReducer,
  updateUserByAdminReducer,
  userCreateByAdminReducer,
  userDeleteAccountReducer,
  adminDeleteAccountReducer,
} from './reducers/userReducer'
import {
  createProductReducer,
  productListReducer,
  productListByAdminReducer,
  singleProductReducer,
  productUpdateReducer,
  productDeleteReducer,
  productCreateReviewReducer,
  myProductsGetReducer,
  productCreateByAdminReducer,
  productUpdateByAdminReducer,
  productDeleteByAdminReducer,
} from './reducers/productReducers'

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userActivation: userActivationReducer,
  userLogin: userLoginReducer,
  userForgotPassword: userForgotPasswordReducer,
  passwordReset: userResetPasswordReducer,
  createProduct: createProductReducer,
  productLists: productListReducer,
  productSingle: singleProductReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  userUpdateProfile: userUpdateReducer,
  userDetails: userDetailsReducer,
  wishlistAdd: wishlistAddReducer,
  productCreateReview: productCreateReviewReducer,
  userProducts: myProductsGetReducer,
  usersList: userListReducer,
  adminUserDetails: adminUserDetailsReducer,
  adminUpdateUser: updateUserByAdminReducer,
  userCreate: userCreateByAdminReducer,
  productListAdmin: productListByAdminReducer,
  productCreateByAdmin: productCreateByAdminReducer,
  productUpdateByAdmin: productUpdateByAdminReducer,
  productDeleteByAdmin: productDeleteByAdminReducer,
  accountDeleteUser: userDeleteAccountReducer,
  deleteAccountByAdmin: adminDeleteAccountReducer,
})

const userInfoFromLocalStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
  // basically, if you want anything to load when your app loads, it must go inside this state. e.g userLogin and local storage data

  //  userLogin: {userInfo: userInfoFromLocalStorage},
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
