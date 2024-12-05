import express, { Application, Request, Response } from "express";
import { runPuppeteer } from "./puppeter/index.js"; // Import the function from puppeteer.ts
import "dotenv/config";
import cors from "cors";

const app: Application = express();
const PORT = process.env.PORT || 7000;

// * Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const startPuppeteer = async () => {
  try {
    console.log("Starting Puppeteer...");
    await runPuppeteer(); 
    console.log("Puppeteer completed!");
  } catch (error) {
    console.error("Error running Puppeteer:", error);
  }
};

startPuppeteer();

app.get("/", (req: Request, res: Response) => {
  return res.send("It's working 🙌");
});

app.listen(PORT, () =>
  console.log(`Server is running on PORT http://localhost:${PORT}`)
);
