import Error403 from "@/components/errors/ForbiddenPage"
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"


const RoleCheck = (props) => {
    const isAdmin = window.location.pathname.startsWith("/admin")
    const user = useSelector(state => state.account.user)
    const userRole = user?.role?.name
    if (isAdmin && userRole === 'ADMIN' || !isAdmin && (userRole === 'USER' || userRole === 'ADMIN')) {
        return (<>{props.children}</>)
    } else {
        return (<Error403 />)
    }
}

const ProtectedRoute = (props) => {
    const isAuthenticated = useSelector(state => state.account.isAuthenticated)
    const location = useLocation();
    return (
        <>
            {isAuthenticated === true ?
                <>
                    <RoleCheck>{props.children}</RoleCheck>
                </> : <Navigate to="/login" replace={true} />
            }
        </>
    )
}
export default ProtectedRoute;