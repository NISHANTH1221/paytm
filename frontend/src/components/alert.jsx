import { useState } from "react"

export const Alert = ({message}) =>{
    const [isDone,setDone]=useState(false)
    let timeout =setTimeout(()=>{
      setDone(true)
    },3000)
    return(
    <div>
        {
        isDone ? null : <AlertDiv message={message} setDone={setDone}/>
         } 
    </div> 
    )
}
const AlertDiv = ({message,setDone}) => {
    return(
        <div className="bottom-5 rounded-md shadow-lg right-5 fixed bg-violet-700 p-2 px-3 text-white font bold flex flex-row gap-2">
         <div>{message} </div>
         <div onClick={()=>setDone(true)} className="cursor-pointer">#</div> 
        </div>
    )

}