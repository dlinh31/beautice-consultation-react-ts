import { Navigate, Outlet } from "react-router-dom"
import { useAtom } from 'jotai';
import { userAtom } from '../../../context/userAtom';

const RequireAuth = () => {
    const [user] = useAtom(userAtom)
    if (!user.id || user.id === -1){
        return <Navigate to='/login' replace/>
    }
    return <Outlet />
}

export default RequireAuth;

