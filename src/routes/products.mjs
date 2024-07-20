import express from 'express'
import { productValidationSchema } from '../utils/productValidationSchema.mjs'
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/products.mjs'

const router = express.Router()

router.post('/products', productValidationSchema, createProduct)
router.get('/products', getProducts)
router.get('/products/:id', getProductById)
router.patch('/products/:id', productValidationSchema, updateProduct)
router.delete('/products/:id', deleteProduct)

export default router
