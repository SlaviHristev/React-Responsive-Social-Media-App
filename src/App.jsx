import { Outlet, Route, Routes } from "react-router-dom"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import NavBar from "./components/Layouts/Main/Navbar/NavBar"
import LeftBar from "./components/Layouts/Main/LeftBar/LeftBar"
import RightBar from "./components/Layouts/Main/RightBar/RightBar"
import Home from "./components/Home/Home"
import Profile from "./components/Profile/Profile"
import ProtectedRoutes from "./guards/routeGuard"



function App() {


  const Layout = () =>{
   return(
    <div>
      <NavBar/>
      <div style={{display:'flex'}}>
        <LeftBar/>
        <Outlet/>
        <RightBar/>
      </div>
    </div>
   )
  }


  return (
    <>
    <Routes>
      <Route path="/" element={<ProtectedRoutes><Layout/></ProtectedRoutes>} >
        <Route path="/" element={<Home/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Route>
     <Route path="/register" element={<Register/>} />
     <Route path="/login" element={<Login/>} />
    </Routes>
    </>
  )
}

export default App
