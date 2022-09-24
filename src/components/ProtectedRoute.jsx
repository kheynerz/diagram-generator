import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Navigate, Outlet } from "react-router"

const ProtectedRoute = ({children, redirectTo = '/login'}) => {
    const {auth} = useContext(AuthContext)
    if (!auth) return <Navigate to={redirectTo}/>
    return children ? children : <Outlet/>
}

export default ProtectedRoute