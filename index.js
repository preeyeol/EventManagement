const express= require("express");
const app=express();
const mongoose=require("mongoose");
require("dotenv").config(".env");
const url=process.env.url;
app.use(express.json());

const userRoute=require("./routes/userRoutes");
const eventRoute=require("./routes/eventRoutes")

app.use("/auth",userRoute);
app.use("/admin",userRoute);
app.use("/events",eventRoute);




mongoose.connect(url).then(()=>{
    console.log("Connected to mongoDB")
}).catch((err)=>{
console.log("Can not connect MongoDB")
})

app.listen(7003,()=>{
    console.log("The server is running on port 7003")
})



