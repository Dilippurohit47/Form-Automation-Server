import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express, { Application, Response } from "express";
import formRoutes from "./routes/formFillRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import userRoutes from "./routes/userRoutes.js";
const app: Application = express();
const PORT = process.env.PORT || 7000;

// * Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_, res: Response) => {
  return res.send("Server is running🙌");
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/form", formRoutes);
app.use("/api/v1/profile", profileRoutes);

app.listen(PORT, () =>
  console.log(`Server is running on PORT http://localhost:${PORT}`)
);
