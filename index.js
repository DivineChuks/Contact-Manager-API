import express from "express"
import dotenv from "dotenv"
import contactRoutes from "./routes/contact.js"
import errorHandler from "./middleware/errorHandler.js"
import connectDb from "./config/db.js"
import authRoute from "./routes/auth.js"
import userRoute from "./routes/user.js"

dotenv.config()

connectDb()
const app = express()

const PORT = process.env.PORT || 8800
app.use(express.json())

app.use("/api/contact", contactRoutes)
app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})