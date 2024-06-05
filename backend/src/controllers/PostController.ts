import client from './ConnectDBControllers';
import Joi from 'joi';
import {Request, Response} from 'express';

// create post, delete post, get posts of an user, get all posts in reverse-chronological order, update post content. 

const postSchema = Joi.object({
    user_id: Joi.number().required(),
    text_content: Joi.string().max(200),
    post_date: Joi.date().timestamp('unix').required(),
    image_url: Joi.string(),
    like_count: Joi.number().default(0).required()
})


interface postObject {
    user_id: number,
    text_content: string,
    post_date: Date,
    image_url: string,
    like_count: number,
}

const samplePost: postObject = {
    user_id: 1,
    text_content: "This will be a sample description for a post that will be displayed on the website",
    post_date: new Date(),
    image_url: "https://www.shutterstock.com/shutterstock/videos/1056585617/thumb/1.jpg?ip=x480",
    like_count: 0,
}

const validatePost = async (postData: postObject) => {
    const { error } = postSchema.validate(postData);
    if (error) {
        return error.details[0].message;
    } return
}

const getAllPosts = async (req: Request, res: Response) => {
    try {
        const result = await client.query('SELECT * FROM beautice.posts ORDER BY post_date DESC;')
        res.status(200).json(result.rows)
    } catch (error){
        res.status(400).json({error: error})
    } 
}


const getPostsFromUser = async (userId: number) => {
    try {
        const result = await client.query('SELECT * FROM beautice.posts WHERE user_id = $1', [userId]);

        return result.rows;
    } catch (error) {
        console.error(error)
        return error
    }
}

const createPost = async (postData: postObject) => {
    const {user_id, text_content, post_date, image_url, like_count} = postData;
    try {
        const result = await client.query(`INSERT INTO beautice.posts (user_id, text_content, post_date, image_url, like_count)
        VALUES ($1, $2, $3, $4, $5)
        `, [user_id, text_content, post_date, image_url, like_count])
    } catch (error) {
        console.error(error)
    }
}

const deletePost = async (postId: number) => {
    try {
        const result = await client.query('DELETE FROM beautice.posts WHERE post_id = $1', [postId])
        return result.rowCount === 1 ? "Delete post successfully" : "Delete post unsuccessfully"
    } catch (error) {
        console.error(error)
        return error
    }
}


const editPost = async (post_id: number, updateData: { text_content?: string, image_url?: string }) => {
    // Construct the SQL query dynamically based on what data is provided
    const updates = [];
    const values = [];

    if (updateData.text_content) {
        updates.push(`text_content = $${updates.length + 1}`);
        values.push(updateData.text_content);
    }

    if (updateData.image_url) {
        updates.push(`image_url = $${updates.length + 1}`);
        values.push(updateData.image_url);
    }

    if (updates.length === 0) {
        throw new Error("No valid fields to update");
    }

    values.push(post_id);
    const setClause = updates.join(', ');

    const query = `UPDATE beautice.posts SET ${setClause} WHERE post_id = $${values.length}`;

    try {
        const result = await client.query(query, values);
        return result.rowCount === 1 ? "Update successful" : "Update failed";
    } catch (error) {
        console.error('Error updating post:', error);
        return error;
    }
}



export {postObject, samplePost, getAllPosts, getPostsFromUser, createPost, deletePost, editPost}