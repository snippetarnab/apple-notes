import express from "express";
import noteRoutes from "./routes/noteRoutes.js";
import { connectDB } from "./config/db.js";

const app = express();
connectDB();
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log("server is running on", PORT);
});

app.use("/api/applenotes", noteRoutes);

// app.get("/api/applenotes",(req,res)=>{
//     res.status(200).json({message:`Note fetches successfully.`})
// })
// app.post("/api/applenotes",(req,res)=>{
//     res.status(201).json({message:`Note created successfully.`})
// })
// app.put("/api/applenotes/:id",(req,res)=>{
//     res.status(200).json({message:`Note updated successfully.`})
// })
// app.delete("/api/applenotes",(req,res)=>{
//     res.status(200).json({message:`Notes fetch successfully.`})
// })
