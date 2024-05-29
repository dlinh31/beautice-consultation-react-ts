import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";


export type User = {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
}

export interface UserContextInterface {
    user: User,
    setUser: Dispatch<SetStateAction<User>>,
    
}

const getUserFromLocalStorage = (): User | null => {
    try {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
        console.error("Failed to load user from local storage", error);
        return null;
    }
}

const defaultUserFromLocalStorage = getUserFromLocalStorage()

const defaultUser = {
    user: defaultUserFromLocalStorage,
    setUser: (user: User) => {}
} as UserContextInterface


export const UserContext = createContext(defaultUser);

type UserProviderProps = {
    children: ReactNode,
}

export function UserProvider ({children}: UserProviderProps) {
    const [user, setUser] = useState<User>(defaultUserFromLocalStorage as User);

    return (
        <UserContext.Provider value = {{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
    
}

