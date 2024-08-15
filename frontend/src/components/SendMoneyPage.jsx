import { useRecoilValue, useSetRecoilState } from "recoil";
import { sendMoneytoUserIdAtom, TransactionDetailsAtom } from "../store/atom";
import axiosInstance from "../axiosinstance";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const SendMoneyPage = () =>{
    const receiverDetails = useRecoilValue(sendMoneytoUserIdAtom);
    const [amount,setAmount]=useState(0);
    const Navigate = useNavigate();
    const setTransactionDetails = useSetRecoilState(TransactionDetailsAtom);
    const handlePayNow = async (e) =>{
      e.preventDefault()
      try{
         const response = await axiosInstance.post('/sendmoney', {
            amount : amount,
            receiverId : receiverDetails.receiverId
         });
         console.log(response.data);
         if(response.status==200){
            setTransactionDetails({
               transactionId : response.data.transactionId,
               receivername : receiverDetails.username,
               amount : amount
            });
         Navigate("/moneysent");
         }
      }catch(error){
         console.log(error)
      }
    }

    return(
       <div>
          <h1 className="text-center text-violet-700 my-5 font-bold text-3xl">Send Money</h1>
          <div className="my-2 block text-center">
            <form>
               <label className="block mx-auto text-md font-sans font-bold text-gray-900 text-start w-80 pt-5 pb-2">To</label>
               <div className="block">
               <input type="text" disabled placeholder={receiverDetails.username} className=" w-80 shadow-sm rounded-md ring-1 ring-inset ring-gray-400 px-2 py-1 focus:ring-violet-800 focus:ring-2 focus:ring-inset placeholder:text-violet-800 placeholder:font-bold"/>
               </div>
               <label className="block mx-auto text-md font-sans font-bold text-gray-900 text-start w-80 pt-5 pb-2">Amount</label>
               <div className="block">
               <input type="number" className="w-80 shadow-sm rounded-md ring-1 ring-inset ring-gray-400 px-2 py-1 focus:ring-violet-800 focus:ring-2 focus:ring-inset" onChange={(e)=>setAmount(Number(e.target.value))}/>
               </div>
               <div className="w-80 mx-auto flex flex-row items-end">
                <button type="submit" className="block py-1 ml-auto mr-0 ring-1 ring-inset bg-violet-700 text-white ring-violet-700 w-30 px-2 my-5 rounded-md font-medium " onClick={(e)=>handlePayNow(e)}>PayNow</button>
               </div>
            </form>
          </div>
       </div>
    )
}