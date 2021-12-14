import express from 'express'
const router = express.Router()

import {
  createProduct,
  getAllProducts,
  createProductByAdmin,
  updateProductbyAdmin,
  getProductsbyAdmin,
  deleteProductByAdmin,
  getProductById,
  updateProduct,
  deleteProduct,
  createProductReview,
  getMyProducts,
} from '../Controllers/productControllers.js'

import { protect, admin } from '../middleware/index.js'

router.get('/', getAllProducts)

router.post('/', protect, createProduct)

router.post('/admin', protect, admin, createProductByAdmin)

router.get('/admin', protect, admin, getProductsbyAdmin)

router.get('/myproducts', protect, getMyProducts)

router.get('/:id', getProductById)

router.post('/:id/reviews', protect, createProductReview)

router.put('/edit/:id/', protect, updateProduct)

router.put('/admin/:id/', protect, admin, updateProductbyAdmin)

router.delete('/delete/:id/', deleteProduct)
router.delete('/delete/admin/:id/', protect, admin, deleteProductByAdmin)

export default router
