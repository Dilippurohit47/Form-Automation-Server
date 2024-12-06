import express from "express";
import { login, signUp } from "../controllers/userControllers.js";

const app = express.Router();

app.post("/sign-up", signUp);
app.post("/sign-in", login);

export default app;
