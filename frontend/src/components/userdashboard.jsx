import { RecoilRoot, useRecoilValue } from "recoil"
import { balanceAtom, usersAtom } from "../store/atom"
import { useState } from "react"

export const UserDashboard = () => {
      return(
        <RecoilRoot>
          <Balance />
          <Users />
        </RecoilRoot>
      )
}

const Balance = () =>{
   const balance = useRecoilValue(balanceAtom);
   return(
    <div className="p-10 text-lg font-bold font-serif text-slate-950">
      Your Balance is {balance}
    </div>
   );
};

const Users = () =>{
  const users = useRecoilValue(usersAtom);
  const [filterValue,setFilter] = useState("");
  const filteredUsers = users.filter((user) => {
    let user_id = user.username;
    return user_id.toLowerCase().includes(filterValue.toLowerCase());
  });
  return(
    <div>
      <p className="font-bold text-gray-900 p-2 text-xl">User</p>
      <input placeholder="search for user ..." type="text" onChange={(e)=>setFilter(e.target.value)} className="w-[98%] mx-[1%]"/>
      {filteredUsers ? 
        filteredUsers.map(user => <UserLayout key={user.id} username={user.username}/>)
      : null }
    </div>
  );
};

const UserLayout = ({username}) =>{
  return(
   <div className="flex flex-row font-normal text-gray-950 p-5 border-b-2 border-solid items-center">
      <div className="basis-1/2">{username}</div>
      <div className="basis-1/2 text-end">
        <button className="rounded-lg bg-blue-600 p-2">Send Money</button>
      </div>
   </div>
  );
};