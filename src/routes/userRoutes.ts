import express from "express"
import { signIn } from "../controllers/userControllers.js"

const app = express.Router()

app.get("/sign-in",signIn)

export default app