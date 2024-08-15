import User, { Account, Transaction } from "../database/db.js";

export const getUserById = async (userId) =>{

    const user = await User.find({_id:userId});

    return user

};

export const UpdatePassword = async (userId, password) =>{

    const res = await User.updateOne({ _id : userId},{password: password});

    return(res.acknowledged);
}

export const getUsersByFilterValue = async(filterValue) => {
    const users = await User.find({
    username : {
        $regex: filterValue,
    }
    })

    return users.map(user => {
        return{
            _id : user._id,
            username : user.username,
            email : user.useremail,
        }
    });
}

export const getBalanceByUserId = async (userId) =>{
    
    const accountOfUser = await Account.findOne({ userId : userId });

    return accountOfUser.balance
};

export const sendMoneyService = async ( senderId , receiverId , amount ) =>{

    const userBalance = await getBalanceByUserId(senderId);

    const remainingBalanceofUser = userBalance-amount;

    const senderResponse = await Account.updateOne({userId : senderId},{balance : remainingBalanceofUser});

    const receiverBalance = await getBalanceByUserId(receiverId);
    
    const remainingBalanceofReceiver = receiverBalance + amount;

    const receiverResponse = await Account.updateOne({userId: receiverId},{balance:remainingBalanceofReceiver});


    if(senderResponse.acknowledged && receiverResponse.acknowledged){
        const transaction = await Transaction.create({
            senderId : senderId,
            receiverId : receiverId,
            amount : amount,
            success : true
        });
        return transaction._id
    }

    await Account.updateOne({userId : senderId},{balance : userBalance});

    await Account.updateOne({userId: receiverId},{balance:receiverBalance});

    await Transaction.create({
        senderId : senderId,
        receiverId : receiverId,
        amount : amount,
        success : false
    });

    return error
    
}