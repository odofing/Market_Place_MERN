import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)

  const { userInfo } = userLogin

  const handleLogout = (e) => {
    if (window.confirm('Are you sure you want to logout?')) {
      dispatch(logout())
    }
    window.location.replace('/')
  }

  return (
    <>
      <header>
        <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
          <Container>
            <LinkContainer to='/'>
              <Navbar.Brand>
                {/* <img
        src='/images/gbada.jpeg'
        width="30"
        height="30"
        className="d-inline-block align-top mr-5"
        alt="logo"
      /> */}
                The Market Place
              </Navbar.Brand>
            </LinkContainer>

            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='nav'>
                <LinkContainer to='/'>
                  <Nav.Link>
                    <i className='far fa-user'></i> home
                  </Nav.Link>
                </LinkContainer>

                <LinkContainer to='/add-product'>
                  <Nav.Link>
                    <i className='fas fa-shopping-cart'></i> Add Product
                  </Nav.Link>
                </LinkContainer>

                {userInfo ? (
                  <>
                    <LinkContainer to='/profile'>
                      <Nav.Link>
                        <i className='far fa-user'></i> profile
                      </Nav.Link>
                    </LinkContainer>

                    <LinkContainer to='/logout'>
                      <Nav.Link onClick={handleLogout} className='text-danger'>
                        <i className='fas fa-sign-out'></i> logout
                      </Nav.Link>
                    </LinkContainer>
                  </>
                ) : (
                  <>
                    <LinkContainer to='/register'>
                      <Nav.Link>
                        <i className='fas fa-user'></i> register
                      </Nav.Link>
                    </LinkContainer>

                    <LinkContainer to='/login'>
                      <Nav.Link>
                        <i className='fas fa-user'></i> login
                      </Nav.Link>
                    </LinkContainer>
                  </>
                )}
                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title='Admin' id='adminmenu'>
                    <LinkContainer to='/admin/users'>
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/products'>
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
                <LinkContainer to='/contact'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> contact
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  )
}

export default Header
