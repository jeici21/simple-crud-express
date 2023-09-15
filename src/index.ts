import express from "express";
import 'dotenv/config'
import cors from 'cors'
import pgp from 'pg-promise'
import { createTableUsers } from "./models/Users";
import routes from "./routes/routes";

const app = express()
const PORT = 5000

export const db = pgp()({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})

createTableUsers()

app.use(cors({ origin: "*" }))
app.use(express.json())
app.use(routes)

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})