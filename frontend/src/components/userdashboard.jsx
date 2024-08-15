import { useRecoilValue, useSetRecoilState } from "recoil"
import { sendMoneytoUserIdAtom } from "../store/atom"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../axiosinstance"

export const UserDashboard = () => {
      return(
        <>
          <Balance />
          <Users />
        </>
      )
}

const Balance = () =>{
   const [balance,setBalance]=useState(0);
   useEffect(()=>{
    const getBalance = async() =>{
      const response = await axiosInstance.get("/balance");
      setBalance(response.data.balance)
    }
    getBalance()
   },[]);
   return(
    <div className="p-10 text-lg font-bold font-serif text-slate-950">
      Your Balance is {balance}
    </div>
   );
};

const Users = () =>{
  const [filterValue,setFilter] = useState("");
  const [filteredUsers,setFilteredUsers] = useState([]);
  const receiverDetails = useRecoilValue(sendMoneytoUserIdAtom);
  useEffect(()=>{
    console.log(receiverDetails);
    },[receiverDetails]);
  useEffect(()=>{
    const getFilteredUsers = async () =>{
      const URL = `/findusers?filter=${filterValue}`;
      const response = await axiosInstance.get(URL);
      if (response.status == 200){
        setFilteredUsers(response.data.users)
      }
    }
    getFilteredUsers();
  },[filterValue])
  return(
    <div>
      <p className="font-bold text-gray-900 p-2 text-xl">User</p>
      <input placeholder="search for user ..." type="text" onChange={(e)=>setFilter(e.target.value)} className="w-[98%] mx-[1%] p-4 ring-4 ring-violet-800 rounded-xl placeholder:text-gray-700 placeholder:font-bold"/>
      {filteredUsers && filteredUsers.length>0 ? 
        filteredUsers.map(user => <UserLayout key={user._id} id={user._id} username={user.username}/>)
      : null }
    </div>
  );
};

const UserLayout = ({id,username}) =>{
  const Navigate = useNavigate();
  const setSendMoneyToUser = useSetRecoilState(sendMoneytoUserIdAtom);
  const handleClick = () =>{
    setSendMoneyToUser({
      receiverId : id,
      username : username
    });
    Navigate("/sendmoney");
  }
  
  return(
   <div className="w=[80%] flex flex-row font-normal text-gray-950 p-5 border-b-2 border-solid items-center">
      <div className="basis-1/2 font-bold text-black">{username}</div>
      <div className="basis-1/2 text-end">
        <button className="rounded-lg bg-blue-600 p-2" onClick={handleClick}>Send Money</button>
      </div>
   </div>
  );

};