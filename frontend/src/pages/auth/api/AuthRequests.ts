import axios from 'axios';


const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3001";

interface userObject {
    email: string,
    password: string,
    first_name: string,
    last_name: string
  }

const userSignUpAPI = async (userInfo: userObject) => {
    try {
        const response = await axios.post(`${baseUrl}/signup`, userInfo);
        // return { data: response.data, status: response.status };
        return response
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.log("error: ", error)
            return { data: error.response.data, status: error.response.status };
        } else {
            return { data: { message: "Network error or server is unreachable" }, status: 500 };
        }
    }
}

const userSignInAPI = async (userInfo: {email: string, password: string}) => {
    try {
        const response = await axios.post(`${baseUrl}/signin`, userInfo);
        return response
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.log("error: ", error)
            return { data: error.response.data, status: error.response.status };
        } else {
            return { data: { message: "Network error or server is unreachable" }, status: 500 };
        }
    }
}

export {userSignUpAPI, userSignInAPI}

