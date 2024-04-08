require('dotenv').config()
require('express-async-errors')
const express = require('express')
const connectdb = require('./db/connect')
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const productsRoutes = require('./routes/products')
const app = express()

app.get('/',(req , res)=>{
    res.send('<h1>Store API</h1>')
})

app.use('/api/v1/products',productsRoutes)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 5000
const start = async()=>{
    try {
        await connectdb(process.env.MONGO_URI)
        app.listen(PORT,()=>{
            console.log(`Server is Listening in port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }   
}

start()