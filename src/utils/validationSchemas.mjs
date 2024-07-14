import { checkSchema } from 'express-validator';

export const userValidationSchema = checkSchema({
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
      options: { min: 5, max: 15 },
      errorMessage: "Username must be at least 5 to 15 characters long",
    },
  },
  email: {
    trim: true,
    escape: true,
    notEmpty: {
      errorMessage: "Email must be present",
    },
    isEmail: {
      errorMessage: "Email must be a valid email address",
    },
  },
  password: {
    optional: { options: { nullable: true } }, // Password is optional for OAuth users
    isString: {
      errorMessage: "Password must be a string",
    },
    isLength: {
      options: { min: 6 },
      errorMessage: "Password must be at least 6 characters long",
    },
  },
  oauthProvider: {
    optional: { options: { nullable: true } },
    isString: {
      errorMessage: "OAuth Provider must be a string",
    },
    isIn: {
      options: [['google', 'facebook', null]],
      errorMessage: "OAuth Provider must be one of 'google', 'facebook', or null",
    },
  },
  oauthId: {
    optional: { options: { nullable: true } },
    isString: {
      errorMessage: "OAuth ID must be a string",
    },
  },
});

