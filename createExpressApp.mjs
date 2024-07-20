import express from 'express'
import baseRouter from './src/routes/index.mjs'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import passport from 'passport'
import MongoStore from 'connect-mongo'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

const createApp = () => {
  const app = express()
  dotenv.config()
  app.use(express.json())
  app.use(cookieParser('ubungen'))
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'sessions-key',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 60000 * 10,
      },
      store: MongoStore.create({
        client: mongoose.connection.getClient(),
      }),
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())

  // use base router
  app.use(baseRouter)
  const isTest = process.env.IS_TEST

  // CREATING A COOKIE EXAMPLE
  app.get('/', (req, res) => {
    const isProduction = process.env.NODE_ENV === 'production'

    res.cookie('greeting', 'guten mogen', {
      maxAge: 60000,
      signed: true,
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
    })
    res.status(200).json({ msg: 'Hello World' })
  })

  return app
}

export default createApp
