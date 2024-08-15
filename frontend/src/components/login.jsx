import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Alert } from "./alert";
import axios from "axios";
import { RecoilRoot } from "recoil";

export const LoginPageComponent = () =>{
  return(
    <RecoilRoot>
     <LoginPage />
    </RecoilRoot>
  )
}

const LoginPage = () =>{
  const Navigate = useNavigate();
  const [useremail,setUserEmail] = useState("");
  const [password,setPassword] = useState("");
  const [alertMessage,setAlertMessage] = useState("");

  const handleClick = async (e) => {
    e.preventDefault()
    const formData = {
      useremail: useremail,
      password: password
    }

    const loginSchema = z.object({
      useremail: z.string().email().endsWith("@gmail.com",{message:"Please enter a valid google mail"}),
      password: z.string().min(8,{message:"Password must be eight characters long"})
    })

    const response = loginSchema.safeParse(formData);

    if(!response.success){
      setAlertMessage(response.error.issues[0].message)
    }
    else{
      try{
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/login`,formData);
        localStorage.setItem("token",res.data.token);
        if(res.status===200){
          console.log("here from login axios component")
          Navigate("/")
        }
      }catch(error){
        setAlertMessage(error.message)
      }
    }
  }

  return(
      <div className="mx-auto w-80 my-10">
          <h1 className="text-center text-violet-700 my-5 font-bold text-3xl">Login</h1>
          <form>
             <label className="block mx-auto text-md font-sans font-bold text-gray-900 text-start w-80 pt-5 pb-2">Useremail</label>
             <div className="block">
             <input type="text" value={useremail} className="disabled:opacity-20 w-80 shadow-sm rounded-md ring-1 ring-inset ring-gray-400 px-2 py-1 focus:ring-violet-800 focus:ring-2 focus:ring-inset" onChange={(e)=>setUserEmail(e.target.value)}/>
             </div>
             <label className="block mx-auto text-md font-sans font-bold text-gray-900 text-start w-80 pt-5 pb-2">Password</label>
             <div className="block">
             <input type="text" value={password} className="disabled:opacity-20 w-80 shadow-sm rounded-md ring-1 ring-inset ring-gray-400 px-2 py-1 focus:ring-violet-800 focus:ring-2 focus:ring-inset" onChange={(e)=>setPassword(e.target.value)}/>
             </div>
             <div className="w-80 mx-auto flex flex-row items-end">
              <button type="button" className="block py-1 ml-auto mr-0 ring-1 ring-inset bg-violet-700 hover:bg-violet-500 text-white ring-violet-700 w-80 px-2 my-5 rounded-md font-medium " onClick={handleClick}>Login</button>
             </div>
             <div className="w-80 mx-auto font-bold text-sm text-violet-700 text-center hover:cursor-pointer" onClick={()=>Navigate("/signup")}>
              <p> New here ? Click here to register</p>
             </div>
          </form>
          {
            alertMessage && alertMessage.length>0 ? <Alert message={alertMessage}/> : null
          }
      </div>
  )
}