const User = require('../models/User')

// handle errors:
const handleErrors = (err) => {
  console.log(err.message, err.code)
  let errors = { email: '', password: '' }

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered'
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect'
  }

  // duplicate email
  if (err.code === 11000) {
    errors.email = 'That email is already registered'
    return errors
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message
    })
  }

  return errors
}

const signup_get = async (req, res) => {
  res.render('signup')
}

const login_get = async (req, res) => {
  res.render('login')
}

const signup_post = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.create({ email, password })
    res.status(201).json(user)
  } catch (error) {
    const errors = handleErrors(error)
    res.status(400).send('error, user not created')
  }
}

const login_post = async (req, res) => {
  const { email, password } = req.body
  console.log(email, password)
  res.send('new login')
}

module.exports = {
  signup_get,
  login_get,
  signup_post,
  login_post
}