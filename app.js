import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import userRoute from './Routes/userRoute.js'
import productRoute from './Routes/productRoute.js'
import uploadRoute from './Routes/uploadRoutes.js'

dotenv.config()
connectDB()

const app = express()

app.use(express.json())
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// create a static folder for images
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use('/api/users', userRoute)
app.use('/api/products', productRoute)
app.use('/api/upload', uploadRoute)

const PORT = process.env.PORT || 6000

app.listen(PORT, console.log(`server running on PORT: ${PORT}`))
