import express, { Application, Request, Response } from "express";
import { playWright } from "./puppeter/index.js"; // Import the function from puppeteer.ts
import "dotenv/config";
import cors from "cors";
import { connectDb } from "./db/mongoose.js";
import userRoutes from "./routes/userRoutes.js";
import formRoutes from "./routes/formFillRoutes.js";
import cookieParser from "cookie-parser";
import {fillFormFields} from "./utils/lableCheckerAi.js"
const app: Application = express();
const PORT = process.env.PORT || 7000;

// * Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

fillFormFields()
connectDb();
// startPuppeteer();
app.get("/", (req: Request, res: Response) => {
  return res.send("Server is running🙌");
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/form", formRoutes);

app.listen(PORT, () =>
  console.log(`Server is running on PORT http://localhost:${PORT}`)
);
