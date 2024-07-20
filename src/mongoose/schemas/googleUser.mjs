import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  googleID: mongoose.Schema.Types.String,
})

export const GoogleUser = mongoose.model('GoogleUser', UserSchema)
