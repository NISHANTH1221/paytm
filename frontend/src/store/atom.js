import { atom, atomFamily , selector , selectorFamily } from "recoil";
import axiosInstance from "../axiosinstance";

const sendMoneytoUserIdAtom = atom({
    key:"sendmoneytouserIdatom",
    default: {}
});

const TransactionDetailsAtom = atom({
    key: "TransactionDetailsAtom",
    default: {
        transactionId: "",
        receivername: "",
        amount : 0
    }
})

export { sendMoneytoUserIdAtom , TransactionDetailsAtom };