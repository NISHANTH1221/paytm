import express from "express";

import { getBalanceController, LoginController, SearchForUserController, sendUserIdcontroller, SignUpController, transactionController, UpdatePasswordController } from "./customercontroller.js";
import authMiddleware from "../middleware.js";


const customerrouter = express.Router();

customerrouter.post("/signup", SignUpController);

customerrouter.post("/login",LoginController);

customerrouter.put("/updatepassword",authMiddleware,UpdatePasswordController);

customerrouter.get("/findusers",authMiddleware,SearchForUserController);

customerrouter.get("/balance",authMiddleware,getBalanceController);

customerrouter.post("/sendmoney",authMiddleware,transactionController);

customerrouter.get("/userId",authMiddleware,sendUserIdcontroller);


export default customerrouter;