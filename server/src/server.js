import express from "express";
import noteRoutes from "./routes/noteRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middlewares/rateLimiter.js";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 3000;

//connect to the database
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("server is running on", PORT);
    });
  })
  .catch((error) => console.log(error));

//middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(rateLimiter);

app.use("/api/applenotes", noteRoutes);
