import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: function () {
      return !this.oauthProvider
    },
  },
  oauthProvider: {
    type: String,
    enum: ['google', 'facebook', null],
    default: null,
  },
  oauthId: {
    type: String,
    unique: true,
    sparse: true,
  },
})

export const User = mongoose.model('User', userSchema)
