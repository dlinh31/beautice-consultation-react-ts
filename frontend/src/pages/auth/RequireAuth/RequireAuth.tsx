import { Navigate, Outlet } from "react-router-dom"
import { useAtom } from "jotai";
import { User, defaultUser, userAtom } from '../../../context/userAtom';

const RequireAuth = () => {
    const user:User = JSON.parse(localStorage.getItem('user') || JSON.stringify(defaultUser));
    // const [user, setUser] = useAtom(userAtom);
    if (!user.id || user.id === -1){
        return <Navigate to='/login' replace/>
    }
    return <Outlet />
}

export default RequireAuth;

