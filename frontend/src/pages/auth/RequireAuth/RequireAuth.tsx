import { Navigate, Outlet } from "react-router-dom"
import { useAtom } from "jotai";
import { User, defaultUser, userAtom } from '../../../context/userAtom';
import { verifyToken } from "../api/AuthRequests";
import { useState, useEffect } from 'react';
import { getUserFromId } from "../api/AuthRequests";

const verifyJWT = async () => {
    const userToken = localStorage.getItem('token') || '';
    try {
        const verification = await verifyToken(userToken);
        console.log(verification)
    if (verification.status === 200){
        return verification.data;
    }
    return false;
    } catch (error){
        console.log("error at RequireAuth")
        return false;
    }
    
}

const RequireAuth = () => {
    const user:User = JSON.parse(sessionStorage.getItem('user') || JSON.stringify(defaultUser));
    const [, setUser] = useAtom(userAtom);
    const [isVerified, setIsVerified] = useState(false);
    useEffect(() => {
        const asyncVerify = async() => {
            const verification = await verifyJWT();
            if(verification){
                const userInfo = await getUserFromId(verification.user_id);
                setIsVerified(true);
                setUser(userInfo.data);
            }
        }
        asyncVerify();
    }, []);

    if ((!user.user_id || user.user_id === -1) && !isVerified){
        return <Navigate to='/login' replace/>
    }

    return <Outlet />
}

export default RequireAuth;