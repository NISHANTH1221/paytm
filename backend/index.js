import express from "express";
import cors from "cors";
import customerrouter from "./customer-backend/customerroutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/user",customerrouter);


app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});



