import { Navigate, Outlet } from "react-router-dom"
import { useAtom } from "jotai";
import { User, defaultUser, userAtom } from '../../../context/userAtom';
import { verifyToken } from "../api/UserRequests";
import { useState, useEffect } from 'react';
import { getUserFromId } from "../api/UserRequests";

const verifyJWT = async () => {
    const userToken = localStorage.getItem('token') || '';
    if (userToken){
        try {
            const verification = await verifyToken(userToken);
        if (verification.status === 200){
            return verification.data;
        }
        return false;
        } catch (error){
            console.log("error at RequireAuth")
            return false;
        }
    }
    return false
    
}

const RequireAuth = () => {
    const user:User = JSON.parse(sessionStorage.getItem('user') || JSON.stringify(defaultUser));
    const [, setUser] = useAtom(userAtom);
    const [isVerified, setIsVerified] = useState(false);
    useEffect(() => {
        const asyncVerify = async() => {
            const data = await verifyJWT();
            if(data){
                console.log("data.user_id ", data.user_id)
                const userInfo = await getUserFromId(data.user_id);
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