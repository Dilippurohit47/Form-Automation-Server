import express from "express"
import {formFill} from "../controllers/automateFillForm.js"
const app = express.Router()

app.post("/fill-form/:id",formFill)

export default app 
