import { atomWithStorage } from 'jotai/utils';

export type User = {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
};

// Define the default user state
export const defaultUser: User = {
    id: -1,
    first_name: '',
    last_name: '',
    email: '',
};

// Create a user atom with default value
export const userAtom = atomWithStorage<User>('user', defaultUser);

