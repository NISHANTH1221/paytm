import mongoose from "mongoose";

mongoose.connect("mongodb+srv://nishanth:nishanthbabu@newdataset.jpm6dqr.mongodb.net/paytm");

const userSchema = new mongoose.Schema({
    useremail : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
    },
    username : {
        type : String,
        lowercase : true,
        required : true,
        minLength : 5,
        maxLength : 30,
        unique : true,
        trim: true
    },
    password  : {
        type : String,
        minLength : 8,
        required : true,
    }
});

const accountSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    balance : {
        type : Number,
        required : true
    }
});

const transactionSchema = new mongoose.Schema({
    senderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    receiverId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    amount : {
        type : Number,
        required : true,
        trim : true
    },
    success :{
        type : Boolean,
        required : true
    }
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);
const Transaction = mongoose.model("Transaction",transactionSchema);

export default User;
export { Account,Transaction };
