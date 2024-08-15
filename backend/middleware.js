import jwt from "jsonwebtoken";

const authMiddleware = (req,res,next) =>{
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(403).send({message:"You should sign in before looking at this page first"});
    }

    const token = authHeader.split(" ")[1];
    try{
        const decodedPayload = jwt.decode(token,process.env.JWT_SECRET);
        if(decodedPayload.id){
            req.userId = decodedPayload.id;
            next();
        }
    }catch(error){
        res.status(403).send({message: "There is something wrong with the account.Please Login into the account"});
    }
};

export default authMiddleware;