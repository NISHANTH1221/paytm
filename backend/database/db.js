import mongoose from "mongoose";

mongoose.connect("mongodb+srv://nishanth:nishanthbabu@newdataset.jpm6dqr.mongodb.net/paytm");

const userSchema = mongoose.Schema({
    useremail : String,
    firstname  : String,
    lastname : String,
    password  : String
});

const User = mongoose.model("User", userSchema);

export default User;
