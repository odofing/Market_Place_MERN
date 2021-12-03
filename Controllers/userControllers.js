import User from '../Models/userModel.js'
import Product from '../Models/productModel.js'
import asyncHandler from 'express-async-handler'
import dotenv from 'dotenv'
import _ from 'lodash'
import jwt from 'jsonwebtoken'
import sgMail from '@sendgrid/mail'

dotenv.config(sgMail.env)
sgMail.setApiKey(process.env.SEND_GRID_API_KEY)

// REGISTER NEW USER
// PUBLIC ROUTE
// POST REQUEST
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  // check of user exists
  const userExists = await User.findOne({ email })
  if (userExists) {
    return res.status(400).json({
      message: 'Email already exists, Please register with a different email',
    })
  }

  // generate token for the user
  const token = jwt.sign(
    {
      name,
      email,
      password,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.TOKEN_EXPIRY }
  )

  // send mail to the user

  const emailData = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Account activation link',
    html: `
                          Please click on the link below to complete your registration</h6>
                          <br> <br>
                        
                         <a href='${process.env.CLIENT_URL}/activate/${token}'>activate account</a>
                          <hr />
                         <p> registration link expires in 15 minutes </p>
                         
                      `,
  }

  sgMail
    .send(emailData)
    .then((sent) => {
      return res.status(200).json({
        success: true,
        message: `Please visit ${email} to complete your registraion`,
      })
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        message: 'Mail could not be sent, please try again',
        errors: errorHandler(err),
      })
    })
})

// ACTIVATE NEW USER
// PUBLIC ROUTE
// POST REQUEST
// // activation and save user into the db
const ActivateUser = asyncHandler(async (req, res) => {
  const { token } = req.body

  // verify token validity
  token &&
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res
          .status(400)
          .json({ error: 'Expired link, Please Signup again' })
      }

      //  if valid, save to db
      // get name, email and password from token
      const { name, email, password } = jwt.decode(token)

      const user = User.create({ name, email, password })

      if (user) {
        return res
          .status(201)
          .json({ success: true, message: 'Account was successfully created' })
      } else {
        return res.status(500).json({
          message: 'email could not be sent, please try again',
          errors: errorHandler,
        })
      }
    })
})

// LOGIN USER
// PUBLIC ROUTE
// POST REQUEST
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  console.log(email, password)

  const user = await User.findOne({ email })

  // compare password
  if (user && (await user.matchPassword(password))) {
    // generate token for the user
    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRY }
    )

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      wishlists: user.wishlists,
      token,
    })
  } else {
    return res.status(401).json('Invalid login credentials')
  }
})

// UPDATE USER PROFILE
// PUT REQUEST
// /api/users/profile
// PRIVATE ROUTE
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    //  user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    // generate token for the user
    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRY }
    )

    res.json({
      message: 'profile updated',
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token,
    })
  } else {
    return res.status(404).json('User not found')
  }
})

// GET USER BY ID
// GET REQUEST /api/users/:id
// PRIVATE ROUTE

const getUserbyId = asyncHandler(async (req, res) => {
  // - password removes password from the returned object
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404).json({ message: 'user not found' })
  }
})

// forgot password
// post request
// public
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    return res.status(404).json({ message: 'Email does not exist' })
  }

  // if user exist, create a one-time link valid for some time
  const secret = process.env.JWT_RESET_PASSWORD_SECRET + user.password

  // data to be stored inside jwt token
  const payload = {
    email: user.email,
    _id: user._id,
  }

  const token = jwt.sign(payload, secret, {
    expiresIn: process.env.TOKEN_EXPIRY,
  })

  // generate reset password link for the user and send via email
  // send an email

  const smg = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: `Password Reset link`,
    html: `
                  <h1>Please use the link below to reset your password</h1>
                
                  <a href='${process.env.CLIENT_URL}/resetpassword/${user._id}/${token}'> RESET PASSWORD </a>
                  <hr />
                  <p> password reset link expires in 15minutes </p>
              `,
  }
  sgMail
    .send(smg)
    .then(() => {
      return res.status(200).json({
        success: true,
        message: `Reset password link was sent to ${email}`,
      })
    })
    .catch((error) => {
      return res.status(501).json('email could not be sent')
    })
})

// reset password
// put request
// public
const resetPassword = asyncHandler(async (req, res) => {
  const { id, token } = req.params
  const { password } = req.body

  const user = await User.findById(id)
  if (!user) {
    return res.status(401).json('Not authorised')
  }

  const secret = process.env.JWT_RESET_PASSWORD_SECRET + user.password
  try {
    const payload = jwt.verify(token, secret)
    user.password = password
    user.save()
    return res.status(201).json({ message: 'password reset was succcesful' })
  } catch (error) {
    return res.status(401).json({ message: 'error reseting password' })
  }
})

// CREATE USER BY ADMIN
// PRIVATE ROUTE
// POST REQUEST api/users/admin
const createUserByAdmin = asyncHandler(async (req, res) => {
  const { name, email, password, isAdmin } = req.body

  // check of user exists
  const userExists = await User.findOne({ email })
  if (userExists) {
    return res.status(400).json({
      message:
        'User already exists, Please register with a different credentials',
    })
  }

  const user = await User.create({
    name,
    email,
    password,
    isAdmin,
  })

  if (user) {
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      message: 'user created',
    })
  } else {
    return res.status(400).json('invalid credentials')
  }
})

// GET ALL USERS
// GET REQUEST /api/users
// PRIVATE ROUTE/admin

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  return res.status(200).json(users)
})

// GET USER BY ID
// GET REQUEST /api/users/admin/:id
// PRIVATE ROUTE/admin

const getUserByAdmin = asyncHandler(async (req, res) => {
  // - password removes password from the returned object
  const user = await User.findById(req.params.id).select('-password')
  if (user) {
    return res.status(201).json(user)
  } else {
    return res.status(404).json('User not found')
  }
})

// UPDATE USER BY ADMIN
// PUT REQUEST
// api/users/admin/:id
// PRIVATE ROUTE/ admin
const updateUserByAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin || user.isAdmin

    const updatedUser = await user.save()

    return res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    return res.status(404).json('User not found')
  }
})

// USER DELETE ACCOUNT (INCLUDING PRODUCTS)
// DELETE REQUEST  /api/users/delete/:id
// PRIVATE ROUTE
const deleteAccount = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await User.deleteOne({ _id: req.params.id })
    await Product.deleteMany({ user: user._id })
    return res.status(200).json('User Deleted Successfully')
  } else {
    return res.status(400).json('user could not be deleted')
  }
})

// ADMIN DELETE ACCOUNT (INCLUDING PRODUCTS)
// DELETE REQUEST  /api/users/admin/delete
// ADMIN/ ROUTE
const adminDeleteAccount = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.id)

  if (user) {
    await User.deleteOne({ _id: req.body.id })
    await Product.deleteMany({ user: user._id })
    return res.status(200).json('User Deleted Successfully')
  } else {
    return res.status(400).json('user could not be deleted')
  }
})

export {
  registerUser,
  ActivateUser,
  loginUser,
  forgotPassword,
  updateUserProfile,
  resetPassword,
  deleteAccount,
  adminDeleteAccount,
  getUsers,
  getUserbyId,
  createUserByAdmin,
  getUserByAdmin,
  updateUserByAdmin,
}
