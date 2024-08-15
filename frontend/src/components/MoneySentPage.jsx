import { useRecoilValue } from "recoil";
import { TransactionDetailsAtom } from "../store/atom"
import { useNavigate } from "react-router-dom";

export const MoneySentPage = () =>{
    const TransactionDetails = useRecoilValue(TransactionDetailsAtom);
    const Navigate = useNavigate();
    return(
      <>
      <div className="block text-violet-700 text-center font-extrabold  mx-auto text-2xl p-5 mt-10">
          Your Money Has Been Succesfully tranfereed 
      </div>    
      <div className="p-2 block text-start font-normal w-80 text-lg mx-auto">
         <div className="text-violet-700">To</div>: {TransactionDetails.receivername}
      </div>
      <div className="p-2 block text-start font-normal w-80 text-lg mx-auto">
       <div className="text-violet-700"> Amount </div>: {TransactionDetails.amount}
      </div>
      <div className="p-2 block text-start font-normal max-w-80 text-lg mx-auto">
        <div className="text-violet-700">Transaction Detalis</div>: {TransactionDetails.transactionId}
      </div>
      <div className=" w-80 p-2 text-end mx-auto">
         <button className="p-2 text-white font-semibold shadow-lg rounded-lg bg-violet-700" onClick={()=>Navigate("/")}>Home</button>
      </div>
      </>
    )
}