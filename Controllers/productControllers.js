import asyncHandler from 'express-async-handler'
import Product from '../Models/productModel.js'
import Stripe from 'stripe'
import { token } from 'morgan'
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY)

// CREATE A PRODUCT
// POST REQUEST /api/products
// private

const createProduct = asyncHandler(async (req, res) => {
  const {
    productName,
    image,
    brand,
    category,
    description,
    price,
    countInStock,
  } = req.body

  const newProduct = new Product({
    productName,
    image,
    user: req.user._id,
    brand,
    category,
    description,
    price,
    countInStock,
  })
  if (newProduct) {
    newProduct.save()
    res.status(201).json(newProduct)
  } else {
    res.status(404).json('product not found')
  }
})

// GET PRODUCTS
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})

  if (products) {
    res.status(200).json(products)
  } else {
    res.status(404)
    throw new Error('Products not found')
  }
})

// get logged in products by a user
// GET /api/products/myproducts
// private
const getMyProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ user: req.user._id })
  if (products) {
    return res.status(200).json(products)
  } else {
    return res.status(404).json({ message: 'product not found' })
  }
})

// GET PRODUCT
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.status(200).json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// UPDATE A PRODUCT
// PUT REQUEST /api/products/admin/:id
// private/admin

const updateProductbyAdmin = asyncHandler(async (req, res) => {
  const {
    productName,
    brand,
    price,
    description,
    image,
    category,
    countInStock,
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    ;(product.productName = productName),
      (product.price = price),
      (product.brand = brand),
      (product.description = description),
      (product.image = image),
      (product.category = category),
      (product.countInStock = countInStock)

    const updatedProduct = await product.save()
    return res.status(201).json({ message: 'product updated' })
  } else {
    return res.status(404).json({ message: 'Product not found' })
  }
})

// GET  ALL PRODUCTS BY ADMIN
const getProductsbyAdmin = asyncHandler(async (req, res) => {
  const products = await Product.find({})

  if (products) {
    return res.status(200).json(products)
  } else {
    return res.status(404).json({ message: 'Products not found' })
  }
})
// CREATE A PRODUCT BY ADMIN
// POST REQUEST /api/products
// private/ admin

const createProductByAdmin = asyncHandler(async (req, res) => {
  const product = new Product({
    productName: 'Hello World',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample Brand',
    category: 'Sample category',
    countInStock: 10,
    numReviews: 0,
    description: 'Sample description',
  })
  const createdProduct = await product.save()
  return res.status(201).json(createdProduct)
})

// DELETE PRODUCT BY ADMIN
// DELETE REQUEST /api/products/admin/:id
// private/ admin

const deleteProductByAdmin = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    return res.status(200).json({ message: 'Product removed' })
  } else {
    return res.status(404).json('Product not found')
  }
})

// UPDATE A PRODUCT
// PUT REQUEST /api/products/edit/:id
// private

const updateProduct = asyncHandler(async (req, res) => {
  const {
    productName,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body

  const product = await Product.findById(req.params.id)

  let productId = JSON.stringify(product.user)

  if (productId === JSON.stringify(req.body._id)) {
    let _id = req.body._id

    if (product) {
      _id,
        (product.productName = productName),
        (product.price = price),
        (product.brand = brand),
        (product.description = description),
        (product.image = image),
        (product.category = category),
        (product.countInStock = countInStock)

      product.save()
      res.status(201).json({ message: 'product successfully updated' })
    } else {
      res.status(500).json({ message: 'product could not be updated' })
    }
  } else {
    return res
      .status(401)
      .json({ message: 'You can update only your products' })
  }
})

// DELETE A PRODUCT
// PUT REQUEST /api/products/delete/:id/
// private

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  let productId = JSON.stringify(product.user)

  if (productId === JSON.stringify(req.body._id)) {
    let _id = req.body._id
    if (product) {
      _id, product.remove()
      res.status(201).json({ message: 'product successfully deleted' })
    } else {
      res.status(404).json('Product not found')
    }
  } else {
    return res
      .status(401)
      .json({ message: 'You can delete only your products' })
  }
})

// create new review
// POST REQUEST /api/products/:id/reviews
// private

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)
  let productId = JSON.stringify(product.user)
  let userId = JSON.stringify(req.user._id)
  if (productId === userId) {
    return res
      .status(401)
      .json({ message: 'you cannot review/rate the product you added' })
  }

  if (product) {
    // check if user already submitted a review
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      return res.status(400).json({ message: 'you have reviewed this product' })
    }
    // review in review schema
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }
    // push review into product schema
    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    return res.status(201).json({ message: 'review added' })
  } else {
    return res.status(400).json({ message: 'you have reviewed this product' })
  }
})

// make payment with stripe
// POST REQUEST /api/products/pay
// private

const makePyament = asyncHandler(async (req, res) => {
  const { productId } = req.body

  const product = await Product.findOne({ productId })
  console.log(product)
})

export {
  createProduct,
  getProductsbyAdmin,
  createProductByAdmin,
  updateProductbyAdmin,
  deleteProductByAdmin,
  getAllProducts,
  getMyProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createProductReview,
  makePyament,
}
