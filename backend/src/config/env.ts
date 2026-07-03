import dotenv from "dotenv"

dotenv.config()

export const ENV = {
  PORT: process.env.PORT,
  FRONTEND_URL: process.env.FRONTEND_URL,
  DB_URL: process.env.DB_URL,
  NODE_ENV: process.env.NODE_ENV

}