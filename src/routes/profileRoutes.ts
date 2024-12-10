import express from "express"
import { createProfile } from "../controllers/profileController.js"

const app = express.Router()
app.post("/save",createProfile)
export default app