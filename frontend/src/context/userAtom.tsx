import { atomWithStorage, createJSONStorage } from 'jotai/utils';

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
};

export const defaultUser: User = {
    id: -1,
    first_name: '',
    last_name: '',
    email: '',
};



const storage = createJSONStorage(() => sessionStorage);
export const userAtom = atomWithStorage<User>('user', defaultUser, storage)