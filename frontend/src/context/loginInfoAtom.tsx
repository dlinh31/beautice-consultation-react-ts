import { atom } from "jotai";

// This atom holds the state of whether the navbar is active
interface loginInfo {
    email: string,
    password: string,
}
export const LoginInfoAtom = atom({email: '', password:''});
