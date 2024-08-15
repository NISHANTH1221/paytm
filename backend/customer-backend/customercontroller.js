import {z} from "zod";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import User, { Account } from "../database/db.js";
import { getUserById, getUsersByFilterValue, UpdatePassword , getBalanceByUserId , sendMoneyService } from "./customerservices.js";

export const SignUpController = async (req,res) =>{
    const body = req.body ;
    console.log("here");
    
    const schema = z.object({
        username : z.string({message : "please enter a valid string"}).min(8,{ message : "Please enter a username with atleast 8 characters"}),
        useremail : z.string().email().endsWith("@gmail.com",{message : " please enter a valid gmail"}),
        password : z.string().min(8,{message:"Password must be of minimum 8 characters"}),
        confirmPassword: z.string().min(8,{message:"Confirm Password must be of minimum 8 characters"})
    });

    if(body.password != body.confirmPassword){
        return res.status(409).json({message:"Password and Confirm Password must be same"})
    }

    const response = schema.safeParse(body);

    if (!response.success){
        return res.status(401).json({message : response.error.issues[0].message});
    }

    if (response.success){
        const existingUser = await User.find({ useremail : body.useremail});
        if(existingUser.length!=0){
            return res.status(409).json({message: "user Already exist, Please login to continue"});
        }
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(body.password,salt)
        try{
            const user = await User.create({
                username : body.username,
                useremail : body.useremail,
                password : hashedPassword
            });

            const userAccount = await Account.create({
                userId : user._id,
                balance : 1000
            });
            
            const payload = {
                id : user._id,
                role: "user"
            }

            const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn : "5d"});

            return res.setHeader("authorization",`Bearer ${token}`).status(200).json({message :"User And Account Created Succesfully",token});
        }catch(error){
           console.log(error);
           return res.status(502).json({message : "cannot create an user now try after some time"})
        }
    }

}

export const LoginController = async (req,res)=>{
    const body = req.body;
    const schema = z.object({
        useremail : z.string().email().endsWith("@gmail.com",{message:"please enter a valid email"}),
        password : z.string().min(8,{message:"Password must be of eight characters long"})
    });

    const response = schema.safeParse(body);

    if(!response.success){
        return res.status(401).json({message : response.error.issues[0].message});
    }
    try{
        const user = await User.find({useremail : body.useremail}) ;


        if(user.length==0){
            return res.status(409).json({message:"You dont have an account Please sign in first"});
        };
        
        const isPassword = await bcrypt.compare(body.password,user[0].password);
        if(isPassword){
            
            const payload = {
                id : user[0]._id,
                role: "user"
            };

            const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn : "5d"});

            return res.status(200).json({token});
        }
        return res.json({message:"Please provide correct password"});
    }catch(error){
       console.log(error);
       return res.status(502).json({message : "cannot create an user now try after some time "});
    };
}

export const UpdatePasswordController = async (req,res) =>{
    const body = req.body;
    const passwordSchema = z.object({
        currentPassword : z.string().min(8),
        newPassword : z.string().min(8),
        confirmPassWord : z.string().min(8),
    });
    const userId = req.userId;

    if(body.newPassword != body.confirmPassWord){
        return res.status(401).send({message: " password and confirm password are not same"});
    }

    const response = passwordSchema.safeParse(body);

    if(!response.success){
        return res.status(403).send({message: "send valid credentails"});
    }
    const user = await getUserById(userId);

    if(user.length==0){
        return res.status(401).send({message: " user not found"});
    }

    const saltRounds = 10 ;
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordCheck = await bcrypt.compare(body.currentPassword,user[0].password);

    if(!passwordCheck){
        return res.json({message:"please enter the correct old password"});
    }
     
    const newHashedPassword = await bcrypt.hash(body.newPassword,salt);
    
    const finalresult = await UpdatePassword(userId,newHashedPassword);

    if(!finalresult){
        return res.status(501).send({message: "There is something wrong with datatbase" });
    }

    return res.status(200).send({message : "You have successfully changed the password"});
}

export const SearchForUserController = async (req,res) =>{
    const filterValue = req.query.filter;
    const schema = z.string()
    const response = schema.safeParse(filterValue);

    if(filterValue==""){
        return res.status(200).send({});
    }

    if (!response.success){
        return res.status(403).json({message: "Filter Value is invalid"})
    }
    try{
        const Users = await getUsersByFilterValue(filterValue);
        return res.status(200).send({users: Users});
    }
    catch(error){
        return res.status(501).send({message: "There is something wrong with datatbase" });
    }
}

export const transactionController = async (req,res) =>{
    const userId = req.userId;
    const body = req.body;

    const schema = z.object({
        amount : z.number().positive({message:"amount must be positve"}),
        receiverId : z.string({message:"invalid receiverId"})
    });

    const response = schema.safeParse(body);

    if(!response.success){
        return res.status(403).json({message:"Amount/ReceiverId/userId is invalid"});
    }

    try{
       const response =  await sendMoneyService(userId,body.receiverId,body.amount);
       return res.status(200).json({ transactionId : response , message:"amount has been tranferred successfully"});
    }
    catch(err){
        return res.status(501).json({message: "There is something wrong with database" });
    }
}

export const getBalanceController = async (req,res) =>{

    const userId = req.userId;

    if(!userId){
        return res.status(401).json({message: " please login to continue"});
    }

    try{
        const user = await getUserById(userId);
        if(user.length < 0){
            return res.status(401).json("The userID does not exist please register your self");
        }

        const balance = await getBalanceByUserId(userId);

        return res.status(200).json({balance : balance});

    }catch(error){        
        return res.status(501).json({message:"There is something wrong with the database"});
    }
}

export const sendUserIdcontroller = (req,res) =>{

    const userId = req.userId ;

    const authHeader = req.headers.authorization;

    if(!userId || !authHeader){
        return res.status(400).json({message : "Please use different acoount"});
    }

    const token = authHeader.split(" ")[1];
  

    const payload = jwt.decode(token,process.env.JWT_SECRET);

    if(payload.id!= userId){
        return res.status(404).json({message : "You hav wrong credentails please login to continue"});
    }
    return res.status(200).send({ userId : userId ,message: "you have recieved the data succesfully"});

}