import express from 'express'
const router = express.Router()

import { protect, admin } from '../middleware/index.js'

import {
  registerUser,
  ActivateUser,
  loginUser,
  getUsers,
  deleteAccount,
  adminDeleteAccount,
  forgotPassword,
  resetPassword,
  updateUserProfile,
  getUserbyId,
  createUserByAdmin,
  getUserByAdmin,
  updateUserByAdmin,
} from '../Controllers/userControllers.js'

router.get('/', protect, admin, getUsers)

router.post('/admin', protect, admin, createUserByAdmin)

router.post('/register', registerUser)

router.post('/activate', ActivateUser)

router.post('/login', loginUser)

router.post('/forgotpassword', forgotPassword)

router.put('/profile', protect, updateUserProfile)

router.get('/:id', protect, getUserbyId)

router.get('/admin/:id', protect, admin, getUserByAdmin)

router.put('/resetpassword/:id/:token', resetPassword)

router.put('/admin/:id', protect, admin, updateUserByAdmin)

router.delete('/delete/:id', protect, deleteAccount)

router.delete('/admin/delete', protect, admin, adminDeleteAccount)

export default router
