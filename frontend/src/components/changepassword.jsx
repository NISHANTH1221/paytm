import { useState } from "react";
import axiosInstance from "../axiosinstance";
import { Alert } from "./alert";

export const ForgotPasswordPage = () =>{
    const [oldPassword,setOldPassword] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [alertMessage,setAlertMessage] = useState("");

    const handleClick = async (e) =>{
      e.preventDefault();
      if(oldPassword==newPassword){
        setAlertMessage("Old and new password cannot be same");
      }
      else{
        try{
          const response = await axiosInstance.post("/updatepassword",{
            currentPassword:oldPassword,
            newPassword:newPassword,
            confirmPassword:confirmPassword
          });
          if(response.status==200){
            setAlertMessage("Password updated successfully");
            Navigate("/")
          }
        }
        catch(error){
          setAlertMessage(error.message);
        }
      }
    }
    return(
      <div className="mx-auto mt-10">
        <div className="text-violet-700 mx-auto p-2 text-2xl font-bold text-center mt-10 mb-5">
          Change Password
        </div>
        <div >
          <form className="flex flex-col items-center">
            <label className="block mx-auto text-md font-sans font-bold text-gray-900 text-start w-80 pt-5 pb-2" onChange={(e)=>setOldPassword(e.target.value)}>Old Password</label>
            <div className="block">
              <input type="Password"  className="w-80 shadow-sm rounded-md ring-1 ring-inset ring-gray-400 px-2 py-1 focus:ring-violet-800 focus:ring-2 focus:ring-inset"/>
            </div>
            <label className="block mx-auto text-md font-sans font-bold text-gray-900 text-start w-80 pt-5 pb-2" onChange={(e)=>setNewPassword(e.target.value)}>New Password</label>
            <div className="block">
              <input type="Password"  className="w-80 shadow-sm rounded-md ring-1 ring-inset ring-gray-400 px-2 py-1 focus:ring-violet-800 focus:ring-2 focus:ring-inset"/>
            </div>
            <label className="block mx-auto text-md font-sans font-bold text-gray-900 text-start w-80 pt-5 pb-2" onChange={(e)=>setConfirmPassword(e.target.value)}>Confirm Password</label>
            <div className="block">
              <input type="text"  className="block w-80 shadow-sm rounded-md ring-1 ring-inset ring-gray-400 px-2 py-1 focus:ring-violet-800 focus:ring-2 focus:ring-inset"/>
            </div>
            <button type="submit" className="block py-1 mx-auto ring-1 ring-inset bg-violet-700 text-white ring-violet-700 w-80 px-2 my-5 rounded-md font-medium " onClick={(e)=>handleClick(e)}>Proceed</button>
          </form>
        </div>
        {
          alertMessage.length>0 && alertMessage ? <Alert message={alertMessage}/> : null
        }
      </div>
  )
}