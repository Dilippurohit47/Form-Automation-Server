import express from "express"
import { createProfile, deleteData, getInformation } from "../controllers/profileController.js"

const app = express.Router()
app.post("/save-information/:userId",createProfile)
app.get("/get-information/:userId",getInformation)
app.post("/delete-information/:userId",deleteData)
export default app