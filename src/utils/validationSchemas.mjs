export const userValidationSchema = {
  username: {
    trim: true,
    escape: true,
    notEmpty: {
      errorMessage: "Username must be present",
    },
    isString: {
      errorMessage: "Username must be a string",
    },
    isLength: {
      options: {
        min: 5,
        max: 15,
        errorMessage: "Username must be at least 5 to 15 characters long",
      },
    },
  },
  name: {
    trim: true,
    escape: true,
    isLength: {
      options: {
        min: 4,
        max: 15,
        errorMessage: "Name must be at least 4 chars long",
      },
    },
    notEmpty: {
      errorMessage: "Name must be present",
    },
    isString: {
      errorMessage: "Name must be a string",
    },
  },
  password: {
    notEmpty: true,
  }
};

//Alternatively...
// import { body } from 'express-validator';

// export const userValidationSchema = [
//   body('username')
//     .trim() // Trims leading and trailing whitespace
//     .notEmpty().withMessage('Username must be present')
//     .isString().withMessage('Username must be a string')
//     .isLength({ min: 5, max: 15 }).withMessage('Username must be at least 5 to 15 characters long'),
  
//   body('name')
//     .trim() // Trims leading and trailing whitespace
//     .notEmpty().withMessage('Name must be present')
//     .isString().withMessage('Name must be a string')
//     .isLength({ min: 4 }).withMessage('Name must be at least 4 chars long')
// ];
