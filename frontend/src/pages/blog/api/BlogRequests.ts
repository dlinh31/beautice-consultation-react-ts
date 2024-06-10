import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL_POST || "http://localhost:3001/post";

interface postObject {
    user_id: number,
    title: string,
    tag: string,
    text_content: string,
    post_date: Date,
    image_url: string,
    like_count: number,
}


const getPostById = async (postId: number) => {
    try {
        const response = await axios.get(`${baseUrl}/getPost/${postId}` );
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

const getAllPosts = async() => {
    try {
        const response = await axios.get(`${baseUrl}/getAllPosts`)
        return response
    } catch (error){
        if (axios.isAxiosError(error) && error.response) {
            console.log("error: ", error)
            return { data: error.response.data, status: error.response.status };
        } else {
            return { data: { message: "Network error or server is unreachable" }, status: 500 };
        }
    }
}

const uploadPostPhoto = async () => {
    
}

export { getPostById, getAllPosts }