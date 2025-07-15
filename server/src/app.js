import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import sensorRoutes from "./routers/sensorRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());



app.use("/api", sensorRoutes);

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
