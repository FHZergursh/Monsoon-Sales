import express from "express"
import {ENV} from "./config/env"
import { clerkMiddleware } from '@clerk/express'
import cors from "cors"
import { User } from "./db/schema"
import userRoutes from "./routes/userRoutes"
import productRoutes from "./routes/commentRoutes"
import commentRoutes from "./routes/userRoutes"


const app = express()

app.use(clerkMiddleware()) 
app.use(express.json())
app.use(cors({origin: ENV.FRONTEND_URL}))

app.get("/", (req, res) => {
  return res.status(200).json("Hello world!")
})

app.use("/api/users", userRoutes)
app.use("/api/comments", productRoutes)
app.use("/api/products", commentRoutes)


app.listen(ENV.PORT, () => console.log("Server running on port " + ENV.PORT))