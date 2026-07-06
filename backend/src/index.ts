import express from "express"
import {ENV} from "./config/env"
import { clerkMiddleware } from '@clerk/express'
import cors from "cors"
import { User } from "./db/schema"

const app = express()

app.use(clerkMiddleware()) 
app.use(express.json())
app.use(cors({origin: ENV.FRONTEND_URL}))

app.get("/", (req, res) => {
  return res.status(200).json("Hello world!")
})

app.listen(ENV.PORT, () => console.log("Server running on port " + ENV.PORT))