import express from "express";
import noteRoutes from "./routes/noteRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middlewares/rateLimiter.js";
import cors from "cors";
import path from "path";
import { clerkMiddleware } from "@clerk/express";

const app = express();

const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

//connect to the database
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("server is running on", PORT);
    });
  })
  .catch((error) => console.log(error));

//middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use(express.json());
app.use(rateLimiter);
app.use("/api", clerkMiddleware());

app.use("/api/applenotes", noteRoutes);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../ui/dist")));

  app.get("/*splat", (req, res) => {
    res.sendFile(path.join(__dirname, "../ui", "dist", "index.html"));
  });
}
