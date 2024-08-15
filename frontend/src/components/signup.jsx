import { useNavigate } from "react-router-dom";
import {z} from "zod";
import { Alert } from "./alert";
import { useState } from "react";
import axios from "axios";
import { RecoilRoot, useSetRecoilState } from "recoil";

export const SignUpPageComponent = () =>{
    return(
        <RecoilRoot>
            <SignUpPage />
        </RecoilRoot>
    )
}

const SignUpPage = () =>{
    const Navigate = useNavigate();
    const [userName,setUserName] = useState("");
    const [userEmail,setUserEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassWord,setConfirmPassword] = useState("");
    const [alertMessage,setAlertMessage] = useState("");
    const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);

    const handleClick = async (e) =>{
        e.preventDefault();
      if(password!==confirmPassWord){
        setAlertMessage("Password and Confirm Password must be same")
      }
      else{
        const formData = {
            username : userName.toLowerCase(),
            useremail:userEmail,
            password:password,
            confirmPassWord : confirmPassWord
        };
        const signUpSchema = z.object({
            username : z.string({message : "please enter valid user username"}),
            userEmail : z.string().email({message : "Please Enter a valid Email"}).endsWith("@gmail.com"),
            password : z.string().min(8,{message : "password must be 8 digits"}),
            confirmPassWord : z.string().min(8,{message : "Confirm Password must be 8 digits"})
        }
        );
        const response = signUpSchema.safeParse(formData);
        if(!response.success){
            setAlertMessage(response.error.issues[0].message);
        }
        else{
            try{
                const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signup`,formData);
                console.log(res.data)
                if(res.status===200){
                    setIsLoggedIn(true);
                    Navigate("/");
                }
            }
            catch(error){
               setAlertMessage(error.message)
            }

        }
      }
    }
    return(
        <div className="mx-auto w-80 my-10">
             <h1 className="text-center text-violet-700 my-5 font-bold text-3xl">SignUp</h1>
            <form >
              <label className="block mx-auto text-md font-sans font-bold text-gray-900 text-start w-80 pt-5 pb-2">Username</label>
               <div className="block">
               <input type="text" className="disabled:opacity-20 w-80 shadow-sm rounded-md ring-1 ring-inset ring-gray-400 px-2 py-1 focus:ring-violet-800 focus:ring-2 focus:ring-inset" onChange={(e)=>setUserName(e.target.value)}/>
               </div>
               <label className="block mx-auto text-md font-sans font-bold text-gray-900 text-start w-80 pt-5 pb-2">Email</label>
               <div className="block">
               <input type="text" className="disabled:opacity-20 w-80 shadow-sm rounded-md ring-1 ring-inset ring-gray-400 px-2 py-1 focus:ring-violet-800 focus:ring-2 focus:ring-inset" onChange={(e)=>setUserEmail(e.target.value)}/>
               </div>
               <label className="block mx-auto text-md font-sans font-bold text-gray-900 text-start w-80 pt-5 pb-2">Password</label>
               <div className="block">
               <input type="Password" className="disabled:opacity-20 w-80 shadow-sm rounded-md ring-1 ring-inset ring-gray-400 px-2 py-1 focus:ring-violet-800 focus:ring-2 focus:ring-inset" onChange={(e)=>setPassword(e.target.value)}/>
               </div>
               <label className="block mx-auto text-md font-sans font-bold text-gray-900 text-start w-80 pt-5 pb-2">Confirm Password</label>
               <div className="block">
               <input type="text" className="disabled:opacity-20 w-80 shadow-sm rounded-md ring-1 ring-inset ring-gray-400 px-2 py-1 focus:ring-violet-800 focus:ring-2 focus:ring-inset" onChange={(e)=>setConfirmPassword(e.target.value)}/>
               </div>
               <div className="w-80 mx-auto flex flex-row items-end">
                <button type="button" className="block py-1 ml-auto mr-0 ring-1 ring-inset bg-violet-700 hover:bg-violet-500 text-white ring-violet-700 w-80 px-2 my-5 rounded-md font-medium " onClick={handleClick}>Sign Up</button>
               </div>
               <div className="w-80 mx-auto font-bold text-sm text-violet-700 text-center hover:cursor-pointer" onClick={()=>Navigate("/login")}>
                <p> Have an account ? Click here to login</p>
               </div>
            </form>
            {
                alertMessage && alertMessage.length>0 ?  <Alert message={alertMessage}/> : null
            }
        </div>
    ) 
}