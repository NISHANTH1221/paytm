import { atom, atomFamily, selector, selectorFamily} from "recoil";
import axios from "axios";
// import { config } from "dotenv";
// config();

const BACKEND_URL = "http://localhost:3000"
const userIdAtom = atom({
    key: "userIdAtom",
    default : "1"
});

const balanceAtom = atom({
    key: "balanceAtom",
    default: selector({
       key : "balanceSelector",
       get: async ({get}) => {
        //    console.log(process.env)
           const UserId = get(userIdAtom);
           const URL = `${BACKEND_URL}/balance?id=${UserId}`;
           const response = await axios.get(URL);
           return(response.data.balance)
       }
    }
    )
});

const usersAtom = atom({
    key: "usersAtom",
    default: selector({
        key: "usersSelector",
        get: async ({get}) => {
            const UserId = get(userIdAtom);
            const URL = `${BACKEND_URL}/users?id=${UserId}`;
            const response = await axios.get(URL);
            return(response.data.users);
        }
    })
});

export {balanceAtom,userIdAtom,usersAtom}