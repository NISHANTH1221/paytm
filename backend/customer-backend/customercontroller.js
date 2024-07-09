import {z} from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../database/db.js";

export const SignUpController = async (req,res) =>{
    const body = req.body ;
    
    const schema = z.object({
        firstname : z.string(),
        lastname: z.string(),
        useremail : z.string().email().endsWith("@gmail.com",{message : " please enter a valid gmail"}),
        password : z.string().min(8)
    });

    const response = schema.safeParse(body);

    if (!response.success){
        return res.status(401).json({message : "please enter correct credentials"});
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
                firstname : body.firstname,
                lastname : body.lastname,
                useremail : body.useremail,
                password : hashedPassword
            });
            const payload = {
                id : user._id,
                role: "user"
            }

            const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn : "5d"});

            return res.status(200).json({message :"User Created Succesfully",token});

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
        password : z.string().min(8)
    });

    const response = schema.safeParse(body);

    if(!response.success){
        return res.status(400).json({message : "please enter valid credentials"});
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