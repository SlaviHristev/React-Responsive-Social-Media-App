import { Navigate } from "react-router-dom";

const isLogged = false;

export default function ProtectedRoutes({children}){
    if (!isLogged) {
        return <Navigate to={'/login'}/>
    }
    return children;
}

