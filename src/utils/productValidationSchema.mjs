import { checkSchema } from 'express-validator'

export const productValidationSchema = checkSchema({
  name: {
    trim: true,
    escape: true,
    notEmpty: {
      errorMessage: 'Product name must be present',
    },
    isLength: {
      options: { min: 3 },
      errorMessage: 'Product name must be at least 3 chars long',
    },
  },
  description: {
    trim: true,
    escape: true,
    notEmpty: {
      errorMessage: 'Product description must be present',
    },
  },
  price: {
    notEmpty: {
      errorMessage: 'Product price must be present',
    },
    isNumeric: {
      errorMessage: 'Product price must be a number',
    },
    isFloat: {
      options: { min: 0 },
      errorMessage: 'Product price must be a positive number',
    },
    toFloat: true,
  },
})
