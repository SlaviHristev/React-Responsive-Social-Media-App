import { Outlet, Route, Routes } from "react-router-dom"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import NavBar from "./components/Layouts/Main/Navbar/NavBar"
import LeftBar from "./components/Layouts/Main/LeftBar/LeftBar"
import RightBar from "./components/Layouts/Main/RightBar/RightBar"
import Home from "./components/Home/Home"
import Profile from "./components/Profile/Profile"
import ProtectedRoutes from "./guards/routeGuard"
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import Messenger from "./components/Messenger/Messenger"


function App() {
  const queryClient = new QueryClient()

  const Layout = () => {
    return (
      <QueryClientProvider  client={queryClient}>
        <div>
          <NavBar />
          <div style={{ display: 'flex' }}>
            <LeftBar />
            <div style={{ flex: 6 }}>
              <Outlet />
            </div>
            <RightBar />
          </div>
        </div>
      </QueryClientProvider>
    )
  }


  return (
    <>
    <QueryClientProvider  client={queryClient}>
      <Routes>
        <Route path="/" element={<ProtectedRoutes><Layout /></ProtectedRoutes>} >
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} /></Route>
        <Route path="/messenger" element={<Messenger/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </QueryClientProvider>
    </>
  )
}

export default App
