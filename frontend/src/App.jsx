import { RecoilRoot } from "recoil";
import { ForgotPasswordPage } from "./components/changepassword.jsx";
import { Header } from "./components/header";
import { LoginPageComponent } from "./components/login.jsx";
import { MoneySentPage } from "./components/MoneySentPage.jsx";
import { SendMoneyPage } from "./components/SendMoneyPage.jsx";
import { SignUpPageComponent } from "./components/signup.jsx";
import { UserDashboard } from "./components/userdashboard.jsx";
import { BrowserRouter, Routes , Route } from "react-router-dom";
import { PleaseLoginPage } from "./components/PleaseLoginPage.jsx";
import { useEffect, useState } from "react";
import axiosInstance from "./axiosinstance.js";

const App= () =>{
  return (
  <BrowserRouter>
    <RecoilRoot>
      <Header/>
      <Routes>
        <Route path="/" element={isAuthenticated(<UserDashboard/>)} />
        <Route path="/signup" element={<SignUpPageComponent/>} />
        <Route path="/login" element={<LoginPageComponent />}/>
        <Route path="/sendmoney" element={isAuthenticated(<SendMoneyPage/>)} />
        <Route path="/moneysent" element={isAuthenticated(<MoneySentPage/>)} />
        <Route path="/changepassword" element={isAuthenticated(<ForgotPasswordPage/>)} />
      </Routes>  
    </RecoilRoot>
  </BrowserRouter>
  )
}

const isAuthenticated = (component)=>{
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const token = localStorage.getItem("token");
  useEffect(()=>{
    const getUserId = async () =>{
      const response = await axiosInstance.get(`/userId`);
      if(response.status ==200 && response.data.userId){
        setIsLoggedIn(true);
      }
    }
    getUserId();
  },[token]);
  return(
    <>
      {
        isLoggedIn ? component : <PleaseLoginPage />
      }
    </>
    
  )
}
export default App;