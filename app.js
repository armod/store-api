require('dotenv').config()
// asyn error

const express = require('express')
const app = express()

const connectDB = require('./db/connect')

const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// middleware
app.use(express.json())

// rootes
app.get('/', (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>')
})

// products route
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    // connsctDB
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server listening port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
