import express from "express";

import { LoginController, SignUpController } from "./customercontroller.js";


const customerrouter = express.Router();

customerrouter.post("/signup", SignUpController);

customerrouter.post("/login",LoginController);

customerrouter.put("/update")

export default customerrouter;