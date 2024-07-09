import { Header } from "./components/header";
import { UserDashboard } from "./components/userdashboard";
// import dotenv from "dotenv";
// dotenv.config()

function App() {
  // console.log(process.env.BACKEND_URL);
  return (
    <>
      <Header />
      <UserDashboard />
    </>
  )
}

export default App
