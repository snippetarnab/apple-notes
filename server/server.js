import express from 'express';

const app = express();

app.listen(5000,()=>{
    console.log('server is running on port 5000');
})

app.get("/api/applenotes",(req,res)=>{
    res.status(200).json({message:`Note fetches successfully.`})
})
app.post("/api/applenotes",(req,res)=>{
    res.status(201).json({message:`Note created successfully.`})
})
app.put("/api/applenotes/:id",(req,res)=>{
    res.status(200).json({message:`Note updated successfully.`})
})
app.delete("/api/applenotes",(req,res)=>{
    res.status(200).json({message:`Notes fetch successfully.`})
})