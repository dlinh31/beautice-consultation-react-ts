import axios from 'axios';

const baseUrl = "http://localhost:3001";

interface userObject {
    email: string,
    password: string,
    first_name: string,
    last_name: string
  }

const userSignUpAPI = async (userInfo: userObject) => {
    try {
        const response = await axios.post(`${baseUrl}/signup`, userInfo);
        return response
        
    } catch (error) {
        console.log(error)
        return
    }
}

const userSignInAPI = async (userInfo: {email: string, password: string}) => {
    try {
        const response = await axios.post(`${baseUrl}/signin`, userInfo);
        return response
    } catch (error) {
        console.log(error)
        return
    }
}

export {userSignUpAPI, userSignInAPI}

