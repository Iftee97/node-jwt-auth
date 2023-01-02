const express = require('express')
const app = express()
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
const { requireAuth } = require('./middleware/authMiddleware')

// middleware
app.use(express.static('public'))
app.use(express.json()) // for parsing json (application/json) body data
app.use(cookieParser()) // for parsing cookies

// view engine
app.set('view engine', 'ejs')

// database connection
const dbURI = 'mongodb+srv://iftee27:iftee27@cluster0.sef1jmu.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then((result) => {
    app.listen(3000, () => {
      console.log('Connected to DB & listening on port 3000')
    })
  })
  .catch((err) => {
    console.log(err)
  })

// routes
app.get('/', (req, res) => res.render('home'))
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'))
app.use(authRoutes)