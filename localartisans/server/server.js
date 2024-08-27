import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import router from "./routes/authRoute.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import authrouter from "./routes/authRoute.js";
import productRouter from "./routes/productRoute.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./client/dist")));

app.use("/api/v1/auth", authrouter);

app.use("/api/v1/products", productRouter);
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/dist/index.html"));
});
app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`);
});
