import express from "express"
import { createProfile, getInformation } from "../controllers/profileController.js"

const app = express.Router()
app.post("/save-information/:userId",createProfile)
app.get("/get-information/:userId",getInformation)
export default app