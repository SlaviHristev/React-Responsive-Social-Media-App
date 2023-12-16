import { Route, Routes } from "react-router-dom"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"



function App() {


  return (
    <>
    <Routes>

     <Route path="/register" element={<Register/>} />
     <Route path="/login" element={<Login/>} />
    </Routes>
    </>
  )
}

export default App
