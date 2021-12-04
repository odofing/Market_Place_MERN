import { BrowserRouter as Router, Route } from 'react-router-dom'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import HomeScreen from './Components/Screens/HomeScreen'
import Header from './Components/Header.js'
import Footer from './Components/Footer'
import { Container } from 'react-bootstrap'
import RegisterScreen from './Components/Screens/RegisterScreen'
import LoginScreen from './Components/Screens/LoginScreen'
import ProfileScreen from './Components/Screens/ProfileScreen'
import ActivationScreen from './Components/Screens/ActivationScreen'
import AddProductScreen from './Components/Screens/AddProductScreen'
import ForgotPasswordScreen from './Components/Screens/ForgotPasswordScreen'
import ResetPasswordScreen from './Components/Screens/ResetPasswordScreen'
import ProductScreen from './Components/Screens/ProductScreen'
import ContactScreen from './Components/Screens/ContactScreen'
import ProductEditScreen from './Components/Screens/ProductEditScreen'
import AllUsersScreen from './Components/Screens/AllUsersScreen'
import AllProductsScreen from './Components/Screens/AllProductsScreen'
import UserEditScreen from './Components/Screens/UserEditScreen'
import AdminCreateUserScreen from './Components/Screens/AdminCreateUserScreen'
import AdminEditProductScreen from './Components/Screens/AdminEditProductScreen'
import PaymentScreen from './Components/Screens/PaymentScreen'
import { useSelector } from 'react-redux'

const App = () => {
  const userLogin = useSelector((state) => state.userLogin)

  const { userInfo } = userLogin

  return (
    <>
      <Router>
        <Header />
        <main className='py-2'>
          <Container>
            <Route exact path='/'>
              {' '}
              <HomeScreen />{' '}
            </Route>

            <Route path='/register'>
              {' '}
              <RegisterScreen />{' '}
            </Route>
            <Route path='/login'>
              {' '}
              <LoginScreen />{' '}
            </Route>
            <Route path='/forgotpassword'>
              {' '}
              <ForgotPasswordScreen />{' '}
            </Route>
            <Route path='/contact'>
              {' '}
              <ContactScreen />{' '}
            </Route>
            <Route path='/resetpassword/:id/:token'>
              {' '}
              <ResetPasswordScreen />{' '}
            </Route>
            <Route path='/activate/:token'>
              {' '}
              <ActivationScreen />{' '}
            </Route>
            <Route path='/products/:productId'>
              {' '}
              <ProductScreen />{' '}
            </Route>
            <Route path='/product/edit/:id'>
              {' '}
              <ProductEditScreen />{' '}
            </Route>
            <Route path='/product/payment/:id'>
              {userInfo ? <PaymentScreen /> : <LoginScreen />}
            </Route>

            <Route path='/add-product'>
              {userInfo ? <AddProductScreen /> : <LoginScreen />}
            </Route>

            <Route path='/profile'>
              {userInfo ? <ProfileScreen /> : <LoginScreen />}
            </Route>

            <Route path='/admin/users'>
              {userInfo && userInfo.isAdmin ? (
                <AllUsersScreen />
              ) : (
                <HomeScreen />
              )}
            </Route>

            <Route path='/admin/products'>
              {userInfo && userInfo.isAdmin ? (
                <AllProductsScreen />
              ) : (
                <HomeScreen />
              )}
            </Route>

            <Route path='/admin/user/:id'>
              {userInfo && userInfo.isAdmin ? (
                <UserEditScreen />
              ) : (
                <HomeScreen />
              )}
            </Route>

            <Route path='/admin/create'>
              {userInfo && userInfo.isAdmin ? (
                <AdminCreateUserScreen />
              ) : (
                <HomeScreen />
              )}
            </Route>

            <Route path='/admin/product/:id/edit'>
              {userInfo && userInfo.isAdmin ? (
                <AdminEditProductScreen />
              ) : (
                <HomeScreen />
              )}
            </Route>
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  )
}
// hello world

export default App
