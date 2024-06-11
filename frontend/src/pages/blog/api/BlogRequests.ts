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

const uploadPostPhoto = async (formData: FormData) => {
    try {
        const response = await axios.post(`${baseUrl}/uploadImage`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response
        // Handle further actions after successful upload if necessary, e.g., showing a success message, clearing the form, etc.
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return { data: error.response.data, status: error.response.status };
        } else {
            return { data: { message: error }, status: 500 };
        }
    }
}

const createPost = async (postData: postObject) => {
    try {
        const response = await axios.post(`${baseUrl}/createPost`, {postData: postData});
        return response
    } catch(error){
        if (axios.isAxiosError(error) && error.response) {
            return { data: error.response.data, status: error.response.status };
        } else {
            return { data: { message: error }, status: 500 };
        }
    }
}

export { getPostById, getAllPosts, uploadPostPhoto, createPost };
export type { postObject };
