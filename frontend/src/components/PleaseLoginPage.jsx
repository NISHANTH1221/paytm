import { useNavigate } from "react-router-dom"

export const PleaseLoginPage =()=>{
    const Navigate = useNavigate();
    
    return(
        <div>
          <h1 className="text-violet-700 text-center my-5 font-bold text-2xl">
            You are not logged in 
          </h1>
          <div className="text-violet-700 text-center my-5 font-bold text-2xl hover:cursor-pointer underline" onClick={()=>Navigate('/login')}>Click Here to go to login</div>
        </div>
    )
}