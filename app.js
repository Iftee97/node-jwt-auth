const express = require('express')
const app = express()
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')

// middleware
app.use(express.static('public'))
app.use(express.json()) // for parsing application/json body data

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
app.get('/smoothies', (req, res) => res.render('smoothies'))
app.use(authRoutes)