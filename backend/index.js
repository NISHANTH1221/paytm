import express from "express";
import cors from "cors";
import customerrouter from "./customer-backend/customerroutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/user",customerrouter);

app.get("/balance",(req,res)=>{
    const userId =req.params.id;
    console.log(userId)
    res.send({balance:5000})
});

app.get("/users",(req,res)=>{
    const UserId = req.params.id
    const users = [{
        id:100001,
        username:"John",
    },{
        id:100002,
        username:"Jane",
    },{
        id:100003,
        username:"Bob",
    },{
        id:100004,
        username:"Alice",
    }]
    console.log(UserId)
    res.send({users:users});

});



app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});



