import { useEffect, useState } from "react"
import { RecoilRoot } from "recoil";
import { Navigate, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosinstance";

export const Header = () => {
    return(
          <HeaderContents />
    )
}

const HeaderContents = () =>{
    const Navigate = useNavigate();
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    useEffect(()=>{
      const getUserId = async () =>{
        const response = await axiosInstance.get(`/userId`);
        if(response.data.userId){
          setIsLoggedIn(true);
        }
      }
      getUserId();
    },[])
    return(
        <>
        <div className="flex flex-row w-screen py-5 px-3 border-b-2 border-solid border-black">
           <div className="font-bold text-lg text-violet-700 basis-1/2 cursor-pointer" onClick={()=>{Navigate("/")}}>Paytm</div>
           <div className="basis-1/2 flex flex-row justify-end gap-3">
              {
                isLoggedIn ? <AccountComponentBasedonLogin />
                : <AccountCreationAndLoginButtons />
              }
           </div>
        </div>
      </>
    )
}

const AccountComponentBasedonLogin = () =>{
    const [clicked,setClicked]=useState(false);
    return(
       <>
         <div className="text-md font-medium" >
            Hello User
        </div>
        <div onClick={()=>setClicked(!clicked)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
        </div>
        {
           clicked ? <CustomerMenu />
          : null
        }
       </>
    )
}


const AccountCreationAndLoginButtons = () =>{
    const Navigate = useNavigate();
    return(
        <div className="flex flex-row justify-end items-center gap-5">
            <button  className="block py-1 ring-1 ring-inset bg-violet-700 hover:bg-violet-500 text-white ring-violet-700 w-30 px-3  rounded-md font-medium " onClick={()=>Navigate("/signup")}>Register</button>
            <button  className="block py-1 ring-1 ring-inset bg-violet-700 hover:bg-violet-500 text-white ring-violet-700 w-30 px-3  rounded-md font-medium " onClick={()=>Navigate("/login")}>Login </button>
        </div>
    )
}
const CustomerMenu = () =>{
  const Navigate = useNavigate();
  return(
      <div className="shadow-sm text-gray-700 border-gray-500 border-current border-t-0 border-2 top-20 fixed right-0 transition-transform p-3 flex flex-col z-1 bg-white">
          <div className="p-2 cursor-pointer">
              My Transactions
          </div>
          <div className="p-2 cursor-pointer" onClick={()=>Navigate('/changepassword')}>
              Change Password
          </div>
          <div className="p-2 cursor-pointer" onClick={()=>{localStorage.removeItem('token');Navigate('/')}}>
              Logout
          </div>
      </div>
  )
}