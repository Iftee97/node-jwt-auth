const signup_get = async (req, res) => {
  res.render('signup')
}

const login_get = async (req, res) => {
  res.render('login')
}

const signup_post = async (req, res) => {
  res.send('new signup')
}

const login_post = async (req, res) => {
  res.send('new login')
}

module.exports = {
  signup_get,
  login_get,
  signup_post,
  login_post
}