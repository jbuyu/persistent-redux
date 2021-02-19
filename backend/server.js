//dotenv
import dotenv from "dotenv";
dotenv.config();
//library imports
import express from "express";
import consola from "consola";
const PORT = process.env.PORT || 4000;
import cors from "cors";
import bodyParser from "body-parser";
const app = express();
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

//db
import connectDB from "./config/db.js";
//modules imports
import productsRouter from "./routes/productsRouter.js";

//middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//route middlewares
app.use("/api/products", productsRouter);

//error middlewares
app.use(notFound);
app.use(errorHandler);

//db
connectDB();

app.listen(PORT, () => {
  consola.success("Server is running on port", PORT);
});